//const { date } = require('google-cloud-bigquery/utils/core');
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const DroneSchema = new mongoose.Schema({
  droneid: {
    type: Number,
  },
  dronename: {
    type: String,
  },
  baseprice: {
    type: Number,
    required: true,
  },
  brand: {
    type: String,
  },
  camera: {
    type: String,
  },
  flightspeed: {
    type: String,
  },
  image: {
    type: String,
  },
  servicetype: {
    type: String,
  },
  weight: {
    type: String,
  },
  registered: {
    type: Boolean,
    default: false,
  },
});

module.exports = mongoose.model("dronedetails", DroneSchema);
