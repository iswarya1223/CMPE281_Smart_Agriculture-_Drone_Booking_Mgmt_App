const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const FarmSchema = new mongoose.Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  farmutilitybillimg: {
    type: String,
  },
  farmagreementid: {
    type: String,
  },
  farmutilitydtissue: {
    type: String,
  },
  farmsqft: {
    type: Number,
  },
  farmname: {
    type: String,
  },
  farmaddress: {
    type: String,
  },
  farmcity: {
    type: String,
  },
  farmcountry: {
    type: String,
  },
  farmzipcode: {
    type: String,
  },
  landownername: {
    type: String,
  },
  certificateid: {
    type: String,
  },
  certissuedate: {
    type: String,
  },
  totalarea: {
    type: String,
  },
  certimage: {
    type: String,
  },
  farmerdrivelicid: {
    type: String,
  },
  farmerdrivelicimg: {
    type: String,
  },
  farmerdrivelicname: {
    type: String,
  },
});
module.exports = mongoose.model("farms", FarmSchema);
