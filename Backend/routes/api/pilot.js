const express = require("express");
const router = express.Router();
const session = require("express-session");
var mysql = require("mysql");

var cors = require("cors");
const { check, validationResult } = require("express-validator");

router.use(cors());
const User = require("../../models/User");
const Farm = require("../../models/Farm");
const Booking = require("../../models/Booking");
const e = require("express");
router.use(express.urlencoded({ extended: true }));
router.use(express.json());
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { secret } = require("../../utils/config");
const { auth } = require("../../utils/passport");
auth();
const connectDB = require("../../config/db");

const config = require("config");
connectDB();

router.post("/addpilotcertificate", [], async (req, res) => {
  try {
    const userid = req.body.userid;
    let result = await User.findOneAndUpdate({ _id: userid }, req.body, {
      upsert: true,
      new: true,
    });
    if (result) {
      res.status(200).json({ message: "pilot cerificate added" });
    } else {
      res.status(400).json({ message: "error adding pilot certificate" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in adding pilot certificate",
      error: error.message,
    });
  }
});

router.post("/addpilotlicense", [], async (req, res) => {
  try {
    const userid = req.body.userid;
    let result = await User.findOneAndUpdate({ _id: userid }, req.body, {
      upsert: true,
      new: true,
    });
    if (result) {
      res.status(200).json({ message: "pilot license added" });
    } else {
      res.status(400).json({ message: "error adding pilot license" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in adding pilot license",
      error: error.message,
    });
  }
});

router.get("/pilotschedule/:userid", [], async (req, res) => {
  let pilotid = req.params.userid;
  console.log(pilotid);
  try {
    let results = await Booking.find({
      pilotid: pilotid,
      $or: [{ status: "Booked" }, { status: "active" }],
    }).lean();
    if (results) {
      res.status(200).json(results);
    } else {
      res.status(400).json({ message: "error in retrieving pilot schedule" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong in retrieving pilot schedule",
      error: error.message,
    });
  }
});

module.exports = router;
