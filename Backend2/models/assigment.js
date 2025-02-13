const mongoose = require("mongoose");

const AssignmentSchema = new mongoose.Schema({
  username: { type: String, required: true },
  assignments: { type: Map, of: Boolean }, // e.g., { "Assignment 1": true, "Assignment 2": false }
});

const ass=mongoose.model("Assignment",AssignmentSchema)

module.exports=ass;
