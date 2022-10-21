const User  = require('../models/User');
const Thought = require('../models/Thought');

async function getAllThoughts(_req, res) {
  try {
    const allThoughts = await Thought.find();
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

module.exports = {
  getAllThoughts,
  getSingleThought,
  createThought,
};
