const express = require("express");
const router = express.Router();
const session = require("express-session");
var mysql = require("mysql");
var mongoose = require("mongoose");
var cors = require("cors");
var moment = require("moment");
const { check, validationResult } = require("express-validator");
const _ = require('underscore');
const FormData = require('form-data');
router.use(cors());
const axios = require('axios');
const User = require("../../models/User");
const booking = require("../../models/Booking");
const Drone = require("../../models/Dronedetail");
const Plot = require("../../models/Plot");
const e = require("express");

router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const connectDB = require("../../config/db");

const config = require("config");
connectDB();
const { checkAuth } = require("../../utils/passport");

router.get("/myplots", [], async (req, res) => {
  let id = req.query.userid;
  try {
    const myplots = await Plot.find({ userid: id }).lean();
    res.status(200).json(myplots);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/mybookings/:id", [], async (req, res) => {
  let id = req.params.id;
  try {
    const bookingdetail = await booking.find({ userid: id }).lean();
    console.log(bookingdetail)
    res.status(200).json(bookingdetail);
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.get("/getpilotbookings/:id", [], async (req, res) => {
  let id = req.params.id;
  try {
    const pilotbookingdetail = await booking.find({ pilotid: id }).lean();
    
    res.status(200).json(pilotbookingdetail);
  } catch (err) {
    res.status(500).send("server error");
  }
});
router.get("/mybookingdet/:bookingid", [], async (req, res) => {
  let id = req.params.bookingid;
  console.log(id)
  try {
    const bookingdetails = await booking.find({ _id: id }).lean();
    res.status(200).json(bookingdetails[0]);
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.get("/savepayment/:bookingid", [], async (req, res) => {
  let id = req.params.bookingid;
  try {
    const paydetails = await booking.updateOne({ _id: id },
      { $set: { 'payment.paystatus' : true } }).lean();
    res.status(200).json(paydetails);
  } catch (err) {
    res.status(500).send("server error");
  }
});

router.get("/searchdrones", [], async (req, res) => {

  let { servicetype, startdate, enddate, min_price, max_price, brand } = req.query;
  now = new Date(startdate)
  now1 = new Date(enddate)
  let query = [
    {
      $lookup: {
        from: "bookings",
        localField: "droneid",
        foreignField: "droneid",
        as: "dronebookingdet",
      },
    },
    { $unwind: "$dronebookingdet" },
  ];

  query.push({
    $match: { $and:[{
      $or: [{'dronebookingdet.startdate' : {$gt: now1}}, {'dronebookingdet.enddate' : {$lt : now}}]},
      {"servicetype" : new RegExp(servicetype,'i')},
      {baseprice:{$gte: parseInt(min_price),$lte:parseInt(max_price)}},
      {"brand": new RegExp(brand,'i')},
    ]
    },
  });
  var id = mongoose.Types.ObjectId(req.query._id);
  try {
    let dronedetails = await Drone.aggregate(query);
    
    dronedetails= await dronedetails.filter((value, index, self) =>
  index === self.findIndex((t) => (
    t.droneid === value.droneid
  ))
)
console.log(dronedetails)
    const dronedetails1 = await booking.find().lean();
    const droneids= _.pluck(dronedetails1,'droneid');
    const dronedetails2 = await Drone.find({servicetype : new RegExp(servicetype,'i'),registered: true,
    baseprice:{$gte: parseInt(min_price),$lte:parseInt(max_price)},brand: new RegExp(brand,'i'),droneid:{$nin:droneids}})
    //const dronedetails = await booking.find({$or: [{startdate : {$gte: now1}}, {enddate : {$lte : now}}] }).lean();
    res.status(200).json(dronedetails2.concat(dronedetails));
  } catch (err) {
    console.log(err);
    res.status(500).send(err.message);
  }
});

router.get("/assignpilot", [], async (req, res) => {
  let { startdate, enddate } = req.query;
  try {
   // const pilotid = await User.aggregate(query);
    const bookingpilot = await booking.find({ $or: [{startdate : {$gt: new Date(enddate)}}, {enddate : {$lt : new Date(startdate)}}]},{'pilotid':1}).lean();
    console.log(bookingpilot)
    if (bookingpilot.length !== 0){
      console.log('iswarya',bookingpilot[0])
      res.status(200).json(bookingpilot[0].pilotid);
    }
    else{
      const bookingdetails1 = await booking.find().lean();
      const pilotids= _.pluck(bookingdetails1,'pilotid');
      const pilotdetails = await User.find({role:'pilot',_id:{$nin:pilotids}}).limit(1)
      res.status(200).json(pilotdetails[0]);
    }
    
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/fly-drone", [], async (req, res) => {
  try {

    const plan ={"fileType":"Plan","mission":{"cruiseSpeed":15,"hoverSpeed":5,"items":[]}}
    const {drone_id,service_id} = req.body
    const result2= await booking.find({droneid: drone_id}).lean();
    const combresult = await result2[0].plotdetails.plotboundaries.map(f => { 
      plan.mission.items.push({
        altitude:50.00000000005293,
        latitude:parseFloat(f.lat),
        longitude : parseFloat(f.lng),
        type:"SimpleItem",
      })
      })
    let form = new FormData();
    form.append('plan',JSON.stringify(plan))
    form.append('drone_id',parseInt(drone_id))
    form.append('service_id',parseInt(service_id))
    console.log(form)
    const result1= await axios.post('http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/fly-simulation/',form,{
    headers: form.getHeaders()
    })
    res.status(200).json(result1.data);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/service-status/:droneid", [], async (req, res) => {
  try {
    const drone_id = req.params.droneid;
    console.log(drone_id)
    const result1= await axios.get(`http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-service-status/${drone_id}`)
    console.log(result1.data.simulated_drone_status)
      if (result1.data.simulated_drone_status === "running") {
        await booking.updateOne({droneid: drone_id},{ $set: { 'status' : 'active' } }).lean();
        //res.status(200).json({success:true});
      } else if (result1.data.simulated_drone_status === "starting") {
        await booking.updateOne({droneid: drone_id},{ $set: { 'status' : 'active' } }).lean();
        
      } else if (result1.data.simulated_drone_status === 'available') {
        console.log('iswarya')
        await booking.updateOne({droneid: drone_id},{ $set: { status : 'finished' } }).lean();
      
      }
      
     res.status(200).json({success:true})
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.post("/bookdrone", [], async (req, res) => {
  let {
    bookingdate,
    startdate,
    enddate,
    droneid,
    pilotid,
    userid,
    starttime,
    endtime,
    plotdetails,
    payment,
    servicetype,
    serviceduration,
    status,
    dronename,
    droneimage,
  } = req.body;
  try {
    const newBooking = new booking({
      bookingdate,
      startdate,
      enddate,
      droneid,
      pilotid,
      userid,
      starttime,
      endtime,
      plotdetails,
      payment,
      servicetype,
      serviceduration,
      status,
      dronename,
      droneimage
    });
    const saveBooking = await newBooking.save();
    if (saveBooking) {
      res.status(200).json({
        message: "Drone booked succesfully",
      });
    } else {
      res.status(400).json({
        message: "There was a problem in booking the drone.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was a problem in booking the drone",
      error: error.message,
    });
  }
});

module.exports = router;
