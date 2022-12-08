//const { date } = require('google-cloud-bigquery/utils/core');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new mongoose.Schema({
  bookingdate: {
    type: Date,
  },
  droneid: {
    type: Number,
    ref: "dronedetails",
    required: true,
  },
  dronename:
  {
    type: String,
  },
  droneimage:{
    type: String,
  },
  startdate: {
    type: Date,
  },
  enddate: {
    type: Date,
  },
  pilotid: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  starttime: {
    type: String,
  },
  endtime: {
    type: String,
  },
  plotdetails: {
    type: Object,
  },
  payment: {
    baseprice: {
      type: Number,
    },
    equipment: {
      type: Object,
    },
    shipping: {
      type: Number,
    },
    pilotcharge: {
      type: Number,
    },
    paystatus: {
      type: Boolean,
    },
  },
  servicetype: {
    type: String,
  },
  serviceduration: {
    type: Number,
  },
  status: {
    type: String,
  },
});

BookSchema.pre(/^find/, function () {
this.populate("userid").populate("pilotid");
});
module.exports = mongoose.model("bookings", BookSchema);
