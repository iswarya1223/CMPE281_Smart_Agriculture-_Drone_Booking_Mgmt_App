const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new mongoose.Schema({
  role: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  uname: {
    type: String,
  },
  mobile: {
    type: Number,
  },
  address: {
    type: String,
  },
  picture: {
    type: String,
  },
  pilotcertinfo: {
    certholder: {
      type: String,
    },
    certid: {
      type: String,
    },
    certimg: {
      type: String,
    },
    gender: {
      type: String,
    },
  },
  pilotlicense: {
    licenseid: {
      type: String,
    },
    licensename: {
      type: String,
    },
    licenseimg: {
      type: String,
    },
  },
  billinginfo: {
    type: Object,
  },
});

module.exports = mongoose.model("users", UserSchema);
