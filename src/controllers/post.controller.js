const postModel = require("../models/post.model");
const Imagekit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new Imagekit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  try {
    if (!req.file) {
      return res.status(400).json({
        message: "Image file is required",
      });
    }

    const fileUploadResponse = await imagekit.files.upload({
      file: await toFile(req.file.buffer, req.file.originalname),
      fileName: req.file.originalname,
    });

    return res.status(201).json({
      message: "Post created successfully",
      fileUploadResponse,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Error creating post",
    });
  }
}

module.exports = { createPostController };
