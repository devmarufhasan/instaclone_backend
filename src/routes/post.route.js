const express = require("express");
const postRouter = express.Router();
const postController = require("../controllers/post.controller");
const multer = require("multer");
const authMiddleware = require("../middlewares/auth.middleware");
const upload = multer({
  storage: multer.memoryStorage(),
});

postRouter.post(
  "/",
  upload.single("image"),
  authMiddleware.identifyUser,
  postController.createPostController,
);

postRouter.get(
  "/",
  authMiddleware.identifyUser,
  postController.getPostController,
);

postRouter.get(
  "/details/:postid",
  authMiddleware.identifyUser,
  postController.getPostDetailsController,
);

postRouter.post(
  "/like/:postid",
  authMiddleware.identifyUser,
  postController.likePostController,
);

postRouter.post(
  "/unlike/:postid",
  authMiddleware.identifyUser,
  postController.unlikePostController,
);

module.exports = postRouter;
