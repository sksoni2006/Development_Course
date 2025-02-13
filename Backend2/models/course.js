const mongoose = require("mongoose");

const CourseSchema = new mongoose.Schema({
  keyname: { type: String, required: true }, // Course Topic
  links: [{ type: String, required: true }], // Array of YouTube links
  createdAtcreatedAt: {
    type: Date,
    default: () => new Date(Date.now() + 5.5 * 60 * 60 * 1000), // Convert UTC to IST
},
});

const Course = mongoose.model("Course", CourseSchema);

module.exports = Course;
