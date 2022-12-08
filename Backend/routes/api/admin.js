const express = require("express");
const router = express.Router();
const session = require("express-session");
var mysql = require("mysql");
var mongoose = require("mongoose");
var cors = require("cors");
const { check, validationResult } = require("express-validator");
const _ = require('underscore');
const axios = require('axios');
router.use(cors());
const FormData = require('form-data');
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
const Dronedetail = require("../../models/Dronedetail");


router.post("/adddrone", [], async (req, res) => {

  let {
    dronename,
    baseprice,
    brand,
    camera,
    flightspeed,
    image,
    servicetype,
    weight,
  } = req.body;
  try {
    const newDrone = new Drone({
      dronename,
      baseprice,
      brand,
      camera,
      flightspeed,
      image,
      servicetype,
      weight,
    });
    const savedDrone = await newDrone.save();
    if (savedDrone) {
      res.status(200).json({
        message: "Drone added",
      });
    } else {
      res.status(400).json({
        message: "There was a problem in adding the drone.",
      });
    }
  } catch (error) {
    res.status(500).json({
      message: "There was a problem in adding the drone",
      error: error.message,
    });
  }
});

router.post("/editdrone/:droneid", [], async (req, res) => {
  try {
    const droneid = req.params.droneid;
    let result = await Drone.findOneAndUpdate({ droneid: droneid }, req.body, {
      upsert: true,
      new: true,
    });
    if (result) {
      res.status(200).json({ message: "drone features updated" });
    } else {
      res.status(400).json({ message: "error updating drone features" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while updating drone features",
      error: error.message,
    });
  }
});

router.delete("/deletedrone/:droneid", [], async (req, res) => {
  try {
    const droneid = req.params.droneid;
    let result = await Drone.deleteOne({ droneid: droneid });
    if (result.deletedCount == 1) {
      res.status(200).json({ message: "drone deleted" });
    } else {
      res.status(400).json({ message: "error in deleting drone" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in deleting drone",
      error: error.message,
    });
  }
});

router.put("/registerdrone/:droneid", [], async (req, res) => {
  try {
    const droneid = req.params.droneid;
    const {dronename,brand,servicetype} = req.body
    let form = new FormData();
    form.append('device_id',parseInt(droneid))
    form.append('device_type','drone')
    form.append('device_model',dronename)
    form.append('device_maker',brand)
    form.append('service_type',servicetype)
    //const body ={device_id:parseInt(droneid),device_type:'drone',device_model:dronename,device_maker:brand,service_type:servicetype}
   
    const result1= await axios.post('http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/register-drone/',form,{
      headers: form.getHeaders()
    })
    console.log(result1)
    let result = await Drone.updateOne(
      { droneid: droneid },
      { $set: { registered: true } }
    );
    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "drone registered" });
    } else {
      res.status(400).json({ message: "error in registering the drone" });
    }
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      message: "Something went wrong in registering the drone",
      error: error.message,
    });
  }
});

router.put("/deregisterdrone/:droneid", [], async (req, res) => {
  try {
    const droneid = req.params.droneid;
    let form = new FormData();
    form.append('device_id',parseInt(droneid))
    const result1= await axios.post('http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/delete-drone/',form,{
      headers: form.getHeaders()
    })
    let result = await Drone.updateOne(
      { droneid: droneid },
      { $set: { registered: false } }
    );
    if (result.modifiedCount == 1) {
      res.status(200).json({ message: "drone deregistered" });
    } else {
      res.status(400).json({ message: "error in deregistering the drone" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in deregistering the drone",
      error: error.message,
    });
  }
});

router.get("/getregisterdronedetails/:droneid", [], async (req, res) => {
  let droneid = req.params.droneid;
  try {
    const dronedetails = await Drone.find({ droneid: droneid }).lean();
    res.status(200).json(dronedetails);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/getunregistereddrones", [], async (req, res) => {
  try {
    const dronedetails = await Drone.find({ registered: false }).lean();
    res.status(200).json(dronedetails);
  } catch (err) {
    res.status(500).send(err.message);
  }
});

router.get("/getdrones", [], async (req, res) => {
    try {
      const dronedetails = await Drone.find().lean();
      res.status(200).json(dronedetails);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

router.get("/getregisterdrones", [], async (req, res) => {
    try {
      const dronedetails = await Drone.find({ registered: true }).lean();
      const droneids= _.pluck(dronedetails,'droneid');
      const res1 = await axios.get('http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-drones/')
      
      const misdrones = await res1.data.filter(o1 => droneids.includes(o1.drone_id));
      const combresult = await dronedetails.map(e => {misdrones.map(f => { 
            if (e.droneid === f.drone_id){e.status = f.status}})
      return e;
    })
      const droneidcom = await droneids.join(',')
      const res2 = await axios.get(`http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-recent-tracking/${droneidcom}`)
      const trackdata=res2.data.tracking_data
      const finalresult = await combresult.map(e1 => {trackdata.map(f1 => { 
        if (e1.droneid === parseInt(f1.drone_id)){
          e1.lat=f1.latitude,e1.lng=f1.longitude}})
  return e1;
})

      res.status(200).json(finalresult);
    } catch (err) {
      res.status(500).send(err.message);
    }
  });

  router.get("/gettrackingdrone/:drone_id", [], async (req, res) => {
    try {
      const drone_id = req.params.drone_id
      console.log(typeof(drone_id))
      const dronedetails = await Drone.find({ droneid: parseInt(drone_id)}).lean();
      
      const res1 = await axios.get(`http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-tracking/${String(drone_id)}`)
     const res2 = await axios.get(`http://ec2-52-203-10-77.compute-1.amazonaws.com/flight_data_collect/get-drone/${String(drone_id)}`)
     const status = res2.data.drone.status
      const dronetrackdet = await res1.data.tracking_data.map(el => ({
        lat:  el.latitude,
        lng: el.longitude,
      }));
      const dronetrackdet1 = await res1.data.tracking_data.map(el => ({
        lat:  el.latitude+0.000005,
        lng: el.longitude-0.000005,
      }));
      res.status(200).json({status,dronedetails,dronetrackdet,dronetrackdet1});
    } catch (err) {
      res.status(500).send(err.message);
    }
  });
module.exports = router;
