const User = require("../models/User");

async function addFriend(req, res) {
  try {
    const initialUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } },
      { new: true }
    )
      .select("-__v")
      .select('-thoughts')
      .populate("friends");
    await User.findOneAndUpdate(
      { _id: req.params.friendId },
      { $addToSet: { friends: req.params.userId } },
      { new: true }
    );
    res.status(200).json(initialUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

async function deleteFriend(req, res) {
  try {
    const initialUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId} },
      { new: true }
    )
      .select("-__v")
      .populate("friends");
    await User.findOneAndUpdate(
        { _id: req.params.friendId },
        { $pull: { friends: req.params.userId} },
        { new: true }
      );
    res.status(200).json(initialUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
}

module.exports = {
  addFriend,
  deleteFriend,
};
