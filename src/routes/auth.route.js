const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controller.js");
const { identifyUser } = require("../middlewares/auth.middleware.js");

authRouter.post("/register", authController.registerController);

authRouter.get("/get-me", identifyUser, authController.getMeController);

authRouter.post("/login", authController.loginController);

authRouter.get("/logout", authController.logoutController);

module.exports = authRouter;
