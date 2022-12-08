const express = require('express');
const router = express.Router();
const session = require('express-session');
var mysql = require('mysql');

var cors = require('cors');
const {check, validationResult} = require('express-validator');

router.use(cors());

const User = require('../../models/User');
//const Cart = require('../../models/Cart');
const e = require('express');

router.use(express.urlencoded({extended: true}));
router.use(express.json())
const connectDB = require('../../config/db');

const config = require('config');
connectDB();
const {checkAuth} = require("../../utils/passport");


router.post('/me',(req,res) => {
    console.log("hi");
console.log(req.body);
const {email} = req.body;
 console.log(email);
try{  
    connection.query(`SELECT * FROM users WHERE email=?`,email,  
    function(error,results){
    console.log(results);
    if(results.length !== 0){
        res.send(JSON.stringify(results));
     }else{
        res.send("failure");
     }
 });
}
catch(err){
    console.error(err.message);
    res.send("server error");
}
}
);

// router.post('/changeprofile'
//   , async (req,res) => {
//     try {
//         const {email,uname,mobile,address,picture} = req.body;
//     let result = await User.findOneAndUpdate({email:email},req.body,{upsert :true, new: true})
//     if (result)
//     {
//         res.status(200).json({success:true});
//     }
//     else{
//         res.status(400).json('failure');
//     } 
 
//    }
//    catch (error) {
//     res.status(400).json({
//       message: "server error",
//     });
//   }
// });

   
module.exports = router;