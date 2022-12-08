const express = require("express");
const router = express.Router();
const session = require("express-session");
var mysql = require("mysql");

var cors = require("cors");
const { check, validationResult } = require("express-validator");

router.use(cors());
const User = require("../../models/User");
const Farm = require("../../models/Farm");
const Plot = require("../../models/Plot");
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

router.post("/addplotinfo", [], async (req, res) => {
  let { userid, farmid, plot_type, boundaries, plotname, plotimage } = req.body;
  try {
    const newPlot = new Plot({
      userid,
      farmid,
      plot_type,
      boundaries,
      plotname,
      plotimage,
    });
    const savedPlot = await newPlot.save();
    if (savedPlot) {
      res.status(200).json({
        message: "Plot added",
      });
    } else {
      res.status(400).json({
        message: "There was a problem in adding the plot.",
      });
    }
  } catch (error) {
    res.status(400).json({
      message: "There was a problem creating your account.",
      error: error.message,
    });
  }
});

router.post("/register", [], async (req, res) => {
  let { uname, email, mobile, password, role } = req.body;
  try {
    const existingUsername = await User.findOne({
      email: email,
    });

    if (existingUsername) {
      res.status(400).json({
        message: "User already registered with this email",
      });
      console.log("User already registered with this emailid");
    } else {
      const newUser = new User({ uname, email, mobile, password, role });
      const salt = await bcrypt.genSalt(10);
      newUser.password = await bcrypt.hash(password, salt);
      const savedUser = await newUser.save();

      if (savedUser) {
        const { uname, email, mobile, password, role } = savedUser;
        const userInfo = {
          uname,
          email,
          mobile,
          password,
          role,
        };
        res.status(200).json({
          message: "User created!",
          userInfo,
        });
      } else {
        res.status(400).json({
          message: "There was a problem creating your account.",
        });
      }
    }
  } catch (error) {
    res.status(400).json({
      message: "There was a problem creating your account.",
    });
  }
});

router.post("/login", [], async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne(
      {
        email: email,
      },
      {},
      { lean: true }
    );
    if (!user) {
      res.status(403).json({
        message: "Wrong username or password.",
      });
    } else {
      bcrypt.compare(password, user.password, async function (err, isMatch) {
        if (err) {
          throw err;
        } else if (!isMatch) {
          res.status(403).json({
            message: "password did not match",
          });
        } else {
          const payload = { id: user.id, email: user.email };
          const token = jwt.sign(payload, secret, {
            expiresIn: 10080000,
          });
          res.cookie("so_token", token, { httpOnly: true });
          res.status(200).json({ token: "JWT " + token, user, success: true });
        }
      });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.post('/changeprofile'
  , async (req,res) => {
    try {
        const {email,uname,mobile,address,picture} = req.body;
    let result = await User.findOneAndUpdate({email:email},req.body,{upsert :true, new: true})
    if (result)
    {
        res.status(200).json({success:true});
    }
    else{
        res.status(400).json('failure');
    } 
 
   }
   catch (error) {
    res.status(400).json({
      message: "server error",
    });
  }
});

router.post("/addfarmprofile", [], async (req, res) => {
  try {
    const userid = req.body.userid;
    let result = await Farm.findOneAndUpdate({ userid: userid }, req.body, {
      upsert: true,
      new: true,
    });
    console.log('iswarya',result)
    if (result) {
      res.status(200).json({ message: "farmer profile updated",result});
    } else {
      res.status(400).json({ message: "error updating farm profile" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong.",
    });
  }
});

router.get('/getfarmprofile', [], async (req, res) => {
  let userid = req.query.userid;
  try {
    const result = await Farm.find({ userid: userid }).lean();
    res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err.message);
  }
});
router.post("/addbillinginfo", [], async (req, res) => {
  try {
    const userid = req.body.userid;
    let result = await User.findOneAndUpdate({ _id: userid }, req.body, {
      upsert: true,
      new: true,
    });
    if (result) {
      res.status(200).json({ message: "user billing info added" });
    } else {
      res.status(400).json({ message: "error adding user billing info" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while adding user billing info",
      error: error.message,
    });
  }
});

router.post("/farmverification", [], async (req, res) => {
  try {
    const userid = req.body.userid;
    let result = await Farm.findOneAndUpdate({ userid: userid }, req.body, {
      upsert: true,
      new: true,
    });
    if (result) {
      res.status(200).json({ message: "farm verification info added" });
    } else {
      res.status(400).json({ message: "error adding farm verification" });
    }
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong while adding farm verification info",
      error: error.message,
    });
  }
});

module.exports = router;
