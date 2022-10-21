const User = require("../models/User");

async function addFriend(req, res) {
  try {
    const addedFriend = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .select("-__v")
      .populate("friends");
    res.status(200).json(addedFriend);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function deleteFriend(req, res) {
  try {
    const removedFriend = await User.findByIdAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: { _id: req.params.friendId } } },
      { new: true }
    )
      .select("-__v")
      .populate("friends");
    res.status(200).json(removedFriend);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  addFriend,
  deleteFriend,
};
