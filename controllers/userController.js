const { User } = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const allUsers = User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    res.status(500).json(err);
  }
}

async function getSingleUser(req, res) {
  try {
    const singleUser = User.findOne({ _id: req.params.userId }).select("-__v");
    res.status(200).json(singleUser);
  } catch (err) {
    res.status(500).json(err);
  }
}

module.exports = {
  getAllUsers,
  getSingleUser,
};
