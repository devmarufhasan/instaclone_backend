const express = require("express");
const userModel = require("../models/user.model.js");
const authRouter = express.Router();

authRouter.get("/", (_req, res) => {
  res.json({
    message: "Auth routes are working",
    availableRoutes: ["POST /api/auth/register"],
  });
});

authRouter.get("/register", (_req, res) => {
  res.status(200).json({
    message: "Use POST /api/auth/register to register a user",
  });
});

authRouter.post("/register", async (req, res) => {
  const { username, email, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists) {
    return res
      .status(409)
      .json({ message: "User with the same email or username already exists" });
  }

  const newUser = new userModel({
    username,
    email,
    password,
    bio,
    profileImage,
  });

  await newUser.save();

  res.status(201).json({ message: "User registered successfully" });
});

module.exports = authRouter;
