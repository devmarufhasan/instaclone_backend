const followerModel = require("../models/follow.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followingUsername = req.params.username;

  try {
    if (followerUsername === followingUsername) {
      return res.status(400).json({ message: "You cannot follow yourself" });
    }

    const existingFollow = await followerModel.findOne({
      follower: followerUsername,
      following: followingUsername,
    });

    if (existingFollow) {
      return res
        .status(400)
        .json({ message: "You are already following this user" });
    }

    const followRecord = await followerModel.create({
      follower: followerUsername,
      following: followingUsername,
    });
    res
      .status(201)
      .json({ message: "User followed successfully", followRecord });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

async function unfollowUserController(req, res) {
  const followerUsername = req.user.username;
  const followingUsername = req.params.username;

  try {
    const existingFollow = await followerModel.findOne({
      follower: followerUsername,
      following: followingUsername,
    });

    if (!existingFollow) {
      return res
        .status(400)
        .json({ message: "You are not following this user" });
    }

    await followerModel.deleteOne({
      follower: followerUsername,
      following: followingUsername,
    });

    res.status(200).json({ message: "User unfollowed successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = { followUserController, unfollowUserController };
