const mongoose = require("mongoose");

const admissionSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Photo: {
      type: String,
    },
    Description: {
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
module.exports = mongoose.model("Admission", admissionSchema);
