const postModel = require("../models/post.model");
const likeModel = require("../models/like.modal");
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

async function likePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postid;

  const post = await postModel.findById(postId);

  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  try {
    const likeRecord = await likeModel.create({
      post: postId,
      user: username,
    });

    res.status(201).json({ message: "Post liked successfully", likeRecord });
  } catch (error) {
    if (error.code === 11000) {
      return res
        .status(400)
        .json({ message: "You have already liked this post" });
    }
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function unlikePostController(req, res) {
  const username = req.user.username;
  const postId = req.params.postid;

  try {
    const likeRecord = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (!likeRecord) {
      return res.status(400).json({ message: "You have not liked this post" });
    }

    await likeModel.deleteOne({
      post: postId,
      user: username,
    });

    res.status(200).json({ message: "Post unliked successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function getFeedController(req, res) {
  const user = req.user;

  const posts = await Promise.all(
    (await postModel.find().populate("userId", "-password").lean()).map(
      async (post) => {
        const isLiked = await likeModel.findOne({
          user: user.username,
          post: post._id,
        });
        post.isLiked = !!isLiked;
        return post;
      },
    ),
  );

  res.status(200).json({ message: "Feed fetched successfully", posts });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailsController,
  likePostController,
  unlikePostController,
  getFeedController,
};
