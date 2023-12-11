const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
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
    Photos: {
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
module.exports = mongoose.model("Teacher", teacherSchema);
