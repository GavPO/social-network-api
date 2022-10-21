const User  = require("../models/User");

async function getAllUsers(req, res) {
  try {
    const allUsers = await User.find();
    res.status(200).json(allUsers);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  };
};

async function getSingleUser(req, res) {
  try {
    const singleUser = await User.findOne({ _id: req.params.userId }).select("-__v");
    res.status(200).json(singleUser);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  };
};

async function createUser(req, res) {
  try {
    const newUser = await User.create(req.body);
    res.status(200).json(newUser);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  };
};

module.exports = {
  getAllUsers,
  getSingleUser,
  createUser,
};
