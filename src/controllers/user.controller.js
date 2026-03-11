const followerModel = require("../models/follow.model");

async function followUserController(req, res) {
  const id = req.user.id;
  const followId = req.params.userid;

  res.status(200).json({
    message: "Follow user controller",
    userId: id,
    followId: followId,
  });
}

module.exports = { followUserController };
