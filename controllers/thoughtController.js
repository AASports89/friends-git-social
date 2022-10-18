const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

const reactions = async (thoughtId) =>
  Thought.aggregate([
        
        {
          $match: { _id: ObjectId(thoughtId) },
        },
        {
          $unwind: "$reactions",
        },
        {
          $group: { _id: thoughtId, totalReactions: { $count: "$reactions.thoughtText"} },
          },
      ]);

module.exports = {
//GET ALL THOUGHTS//
getThoughts(req, res) {
  Thought.find()
  .then((thoughts) => res.json(thoughts))
      .catch((err) => res.status(500).json(err));
  },

//GET SINGLE THOUGHT VIA ID//
  getSingleThought(req, res) {
    Thought.findOne({_id: req.params.thoughtId})
    .select('-__v')
    .then(async (thought) =>
      !thought
        ? res.status(404).json({ message: "Error❗⛔ Thought ID does not exist❗⛔"  })
        : res.json({
          thought,
          reactions: await reactions(req.params.thoughtId),
        })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
//CREATE THOUGHT//
  createThought(req, res) {
    Thought.create(req.body)
    .then(thought => {
      User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { thoughts: thought._id } },
        { new: true },
        )
      .then((thought) => res.json(thought))
      .catch((err) => {
        console.log(err);
        return res.status(500).json(err);
      });
  })
},
  //DELETE THOUGHT//
  deleteThought(req, res) {
    Thought.findByIdAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: "Error❗⛔ Thought ID does not exist❗⛔" })
      : User.deleteMany({ _id: { $in: thought.users } })
  )
  .then(() => res.json({ message: "Warning❗⛔ Thought & User deleted❗❌"}))
  .catch((err) => res.status(500).json(err));
},
//UPDATE THOUGHT//
  updateThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $set: req.body },
      { runValidators: true, new: true },
    )
      .then((thought) =>
        !thought
          ? res.status(404).json({ message: "Error❗⛔ Thought ID does not exist❗⛔" })
          : res.json(thought)
      )
      .catch((err) => res.status(500).json(err));
  },
//ADD REACTION --> THOUGHT//
  addReactionToAThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $push: {reactions: req.body }},
      { new: true, runValidators: true }
    )
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message:  "Error❗⛔ Reaction ID does not exist❗⛔" });
        return;
      }
      res.json(thought)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
  },
//REMOVE REACTION --> THOUGHT//
  removeReactionFromAThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: {reactions: {reactionId : params.reactionId}}},
      { new: true, runValidators: true }
    )
    .then((thought) => {
      if (!thought) {
        res.status(404).json({ message:  "Error❗⛔ Failed to find a reaction❗⛔"});
        return;
      }
      res.json(thought)
    })
    .catch((err) => {
      res.status(400).json(err)
    });
  }
};