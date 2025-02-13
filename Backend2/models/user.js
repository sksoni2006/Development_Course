const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true }, // Plaintext (should be hashed in production)
  completedAssignments: [
    {
      assignmentId: { type: mongoose.Schema.Types.ObjectId, ref: "Assignment" },
      completed: { type: Boolean, default: false },
    }
  ]
});

const User = mongoose.model("User", UserSchema);
module.exports = User;
