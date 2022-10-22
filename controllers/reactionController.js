const Thought = require("../models/Thought");

async function addReaction(req, res) {
  try {
    const addedReaction = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $addToSet: { reactions: req.body } },
      { runValidators: true, new: true }
    ).select('-__v')
    .populate('reactions');
    res.status(200).json(addedReaction);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  };
};

async function deleteReaction(req, res) {
    try {
        const deletedReaction = await Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $pull: { reactions: { _id: req.params.reactionId} } },
            { runValidators: true, new: true }
          ).select('-__v')
          .populate('reactions');
          res.status(200).json(deletedReaction);
    } catch (err) {
        console.error(err);
        res.status(500).json(err)
    };
};

module.exports = {
    addReaction,
    deleteReaction,
}