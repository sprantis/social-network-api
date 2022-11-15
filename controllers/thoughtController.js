// Referencing code from Module 18 Activities

const { Thought, User } = require('../models');

module.exports = {
  // Get all thoughts
  getThoughts(req, res) {
    Thought.find()
      .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },
  // Get a single thought
  getSingleThought(req, res) {
    Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate('reactions')
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
  // create a new thought
  createThought(req, res) {
    Thought.create(req.body)
        .then((thought) => {
            return User.findOneAndUpdate(
                { _id: req.params.userId },
                { $push: { thoughts: thought._id} },
                { runValidators: true, new: true }
            )
        })
        .then((user) => {
            !user
            ? res
                .status(404)
                .json({ message: 'thought created, but no users with this ID' })
            : res.json({ message: 'thought created' })
        })
        .catch((err) => res.status(500).json(err));
  },
  // update a thought
  updateThought() {
    Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
      )
        .then((thought) =>
          !thought
            ? res.status(404).json({ message: 'No thought with this id!' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
  },
  // Delete a thought
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: 'No thought with that ID' })
          : Reaction.deleteMany({ _id: { $in: thought.reactions } }) // BONUS
      )
      .then(() => res.json({ message: 'Thought and associated reactions deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Add reaction
  addReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $push: { reactions: req.params.reactionId } },
        { new: true }
      )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought with this ID' })
        : res.json({ message: 'Reaction added' })
    )
    .catch((err) => res.status(500).json(err));
  },
  // Delete reaction
  deleteReaction(req, res) {
    Thought.findOneAndUpdate(
        { _id: req.body.thoughtId },
        { $pull: { reactions: req.params.reactionId } },
        { new: true }
      )
    .then((thought) =>
      !thought
        ? res
            .status(404)
            .json({ message: 'No thought with this ID' })
        : res.json({ message: 'Reaction deleted' })
    )
    .catch((err) => res.status(500).json(err));
  }
};