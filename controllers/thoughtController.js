const User  = require('../models/User');
const Thought = require('../models/Thought');

async function getAllThoughts(_req, res) {
  try {
    const allThoughts = await Thought.find().select('-__v');
    res.status(200).json(allThoughts);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  };
};

async function getSingleThought(req, res) {
  try {
    const singleThought = await Thought.findOne({ _id: req.params.userId }).select("-__v");
    res.status(200).json(singleThought);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  };
};

async function createThought(req, res) {
  try {
    const newThought = await Thought.create(req.body);
    const associatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $addToSet: { thoughts: newThought._id } },
        { new: true },
    ).select('-__v')
    .populate('thoughts');
    res.status(200).json(associatedUser);
  } catch (err) {
    console.error(err)
    res.status(500).json(err);
  };
};

async function updateThought(req, res) {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { new: true },
    ).select('-__v');
    res.status(200).json(updatedThought);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
};

async function deleteThought(req, res) {
  try {
    await Thought.findOneAndRemove({ _id: req.params.thoughtId });
    const associatedUser = await User.findOneAndUpdate(
      { thoughts: req.params.thoughtId},
      { $pull: { thoughts: req.params.thoughtId }},
      { new: true },
    ).select('-__v')
    .populate('thoughts');
    res.status(200).json(associatedUser)
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
};

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
};
