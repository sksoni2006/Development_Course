const express = require('express');
const Assignment = require("../models/assigment");

const router = express.Router();

router.post("/update", async (req, res) => {
  const { username, assignmentName, status } = req.body;
  let userAssignment = await Assignment.findOne({ username });

  if (!userAssignment) {
    userAssignment = new Assignment({ username, assignments: {} });
  }
  userAssignment.assignments.set(assignmentName, status);
  await userAssignment.save();
  res.json({ message: "Updated successfully" });
});

router.get("/all", async (req, res) => {
  const assignments = await Assignment.find();
  res.json(assignments);
});

module.exports = router;