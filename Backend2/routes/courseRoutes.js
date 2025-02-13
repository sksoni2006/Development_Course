const express = require("express");
const Course = require("../models/course");

const router = express.Router();

// GET method to fetch all course structures
router.get("/coursestructure", async (req, res) => {
  try {
    const courses = await Course.find(); // Fetch all courses
    res.json(courses);
  } catch (error) {
    console.error("Error fetching course structure:", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
