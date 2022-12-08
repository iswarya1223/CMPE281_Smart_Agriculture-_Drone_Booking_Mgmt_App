const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PlotSchema = new mongoose.Schema({
  userid: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  farmid: {
    type: Schema.Types.ObjectId,
    ref: "farms",
    required: true,
  },
  plot_type: {
    type: String,
  },
  boundaries: [
    {
      lat: { type: String },
      lng: { type: String },
    },
  ],

  plotname: {
    type: String,
  },
  plotimage: {
    type: String,
  },
});
module.exports = mongoose.model("plots", PlotSchema);
