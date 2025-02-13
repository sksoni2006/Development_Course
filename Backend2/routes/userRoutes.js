const express = require('express');
const User = require("../models/user.js");

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { username, name } = req.body;
    const user = new User({ username, name });
    await user.save();
    res.status(201).json({ message: "User registered!" });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// router.post('/login', async (req, res) => {
//   const { username } = req.user;  // Fix: use req.user.username instead of name
  
//   try {
//       const user = await User.findOne({ username }).select("-password"); // Exclude password from response
      
//       if (!user) {
//           return res.status(404).json({ message: "User not found" });
//       }
      
//       return res.json({ user });
//   } catch (err) {
//       console.error("Error fetching user:", err);
//       return res.status(500).json({ message: "Internal server error" });
//   }
// });



router.post('/login', async (req, res) => {
  const { username, password } = req.body;
  
  try {
      let user = null;

     
      user = await User.findOne({ username });
  
      if (!user) {
          return res.status(401).json({ message: "Invalid credentials" });
      }

      if(user.password !== password) {
          return res.status(401).json({ message: "Invalid credentials" });
      }
      return res.json({ status: true, message: "Login successful" });

  } catch (err) {
      res.status(500).json({ message: "Internal server error" });
  }
});




router.get('/points', async (req, res) => {
  try {
    const leaderboard = await User.find({}, "username completedAssignments");

    console.log("📊 Sending leaderboard:", leaderboard); // Debug log

    if (!leaderboard || !Array.isArray(leaderboard)) {
      return res.status(404).json({ message: "No leaderboard data available", data: [] });
    }

    res.json(leaderboard);
  } catch (err) {
    console.error("❌ Error fetching leaderboard:", err);
    res.status(500).json({ message: "Internal server error", data: [] });
  }
});



module.exports = router;