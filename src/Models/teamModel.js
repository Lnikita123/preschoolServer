const mongoose = require("mongoose");

const TeamDataSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Name: {
      type: String,
    },

    Education: {
      type: String,
    },
    Photo: {
      type: String,
    },

    Published: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("TeamData", TeamDataSchema);
