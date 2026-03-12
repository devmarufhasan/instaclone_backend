const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/:username",
  authMiddleware.identifyUser,
  userController.followUserController,
);

userRouter.post(
  "/unfollow/:username",
  authMiddleware.identifyUser,
  userController.unfollowUserController,
);

module.exports = userRouter;
