const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const mongoose = require("mongoose");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const decoded = req.user;

  const file = await imagekit.files.upload({
    file: await toFile(req.file.buffer, req.file.originalname),
    fileName: req.file.originalname,
    folder: "instaclone",
  });

  const post = await postModel.create({
    userId: decoded.id,
    imgUrl: file.url,
    caption: req.body.caption,
  });

  res.status(201).json({
    message: "Post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const decoded = req.user;

  const userId = decoded.id;
  const posts = await postModel.find({ userId });

  res.status(200).json({
    message: "Posts fetched successfully",
    posts,
  });
}

async function getPostDetailsController(req, res) {
  const decoded = req.user;

  const postId = new mongoose.Types.ObjectId(req.params.postid);
  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  const isValidUser = post.userId.toString() === decoded.id;

  if (!isValidUser) {
    return res.status(403).json({ message: "Forbidden" });
  }

  res.status(200).json({
    message: "Post details fetched successfully",
    post,
  });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
};
