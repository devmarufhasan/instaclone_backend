const express = require("express");
const userController = require("../controllers/user.controller");
const authMiddleware = require("../middlewares/auth.middleware");

const userRouter = express.Router();

userRouter.post(
  "/follow/:userid",
  authMiddleware.identifyUser,
  userController.followUserController,
);

module.exports = userRouter;
