const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: [true, "Username already exists"],
  },
  email: {
    type: String,
    required: true,
    unique: [true, "Email already exists"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  bio: {
    type: String,
    default: "",
  },
  profileImage: {
    type: String,
    default: "https://ik.imagekit.io/pejjepyz8/instaclone/user-default.png",
  },
});

const userModel = mongoose.model("users", userSchema);

module.exports = userModel;
