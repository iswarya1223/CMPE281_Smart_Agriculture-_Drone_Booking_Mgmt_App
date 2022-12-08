const express = require('express');
//const auth = require('../../middleware/auth');
const router = express.Router();
const {checkAuth, auth} = require("../../utils/passport");
var mysql = require('mysql');
auth();
//For route use  GET api/auth

router.get('/authentication',checkAuth,(req,res) => 
{

    console.log(req.user[0]);
    console.log("hi")
if (req.session)
{
    //res.json({ success: true, isAuthenticated: true, user: {email: user.email, id: user.id, username: user.username} });
    res.json({success: true, user : req.user[0]});
}
});
module.exports = router;