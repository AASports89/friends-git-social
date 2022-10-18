const { User, Thought } = require("../models");

module.exports = {
//GET ALL THOUGHTS//
  getThoughts(req, res) {
    Thought.find()
      .populate({ path: "reactions", select: "reactionBody" })
      .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
  },

//GET SINGLE THOUGHT VIA ID//
  getSingleThought(req, res) {
    Thought.find({ _id: req.params.thoughtId })
      .then((thought) => {
        !thought
          ? res.status(404).json({ message: "Error❗⛔ Thought ID does not exist❗⛔"  })
          : res.json({message: `Displaying: ${req.params.thoughtId}`,
            thought: thought,
      });
    })
  .catch((error) => res.status(500).json(error));
  },

//CREATE THOUGHT//
  createThought(req, res) {
    Thought.create(req.body)
    .then(thought => {
      console.log(thought);
				!thought
					? res.status(404).json({ message: "Error❗⛔ Failed to create thought❗⛔" })
					: User.findOneAndUpdate(
							{ username: thought.username },
							{ $push: { thoughts: thought._id } },
							{ new: true }
					  ).then((user) => console.log(`Thought successfully added to: ${user} ✅`));
				res.json(thought);
			})
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
  
  //DELETE THOUGHT//
  deleteThought(req, res) {
    Thought.findByIdAndDelete({ _id: req.params.thoughtId })
    .then((thought) =>
    !thought
      ? res.status(404).json({ message: "Error❗⛔ Thought ID does not exist❗⛔" })
      : User.deleteMany({ _id: { $in: thought.users } })
  )
  .then(() => res.json({ message: `Warning❗⛔ ${req.params.thoughtId} Thought & User deleted❗❌`}))
  .catch((err) => res.status(500).json(err));
},

//UPDATE THOUGHT//
  updateThought(req, res) {
    Thought.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: { thoughtText: req.body.thoughtText } },
			{ new: true }
		).then((thought) =>
			!thought
				? res.status(404).json({ message: "Error❗⛔ Thought ID does not exist❗⛔" })
				: res.json(thought)
		);
	},

//ADD REACTION --> THOUGHT//
  addReactionToAThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
			{ $push: { reactions: req.body } }
		).then((reaction) =>
			!reaction
				? res
						.status(404)
						.json({ message: "Error❗⛔ Reaction ID does not exist❗⛔" })
				: res.json(reaction)
		);
	},

//REMOVE REACTION --> THOUGHT//
  removeReactionFromAThought(req, res) {
    Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } }
		).then((reaction) =>
			!reaction
				? res
						.status(404)
						.json({ message: "Error❗⛔ Failed to find a reaction❗⛔" })
				: res.json({
						message: `Warning❗⛔ Deleted: ${req.params.reactionId}❗❌`,
						reactionBody: reaction,
				  })
		);
	},
};