const { Thoughts, Users } = require("../models");

module.exports = {
//CREATE THOUGHT//
	createThought(req, res) {
		Thoughts.create(req.body)
			.then((thought) => {
				console.log(thought);
				!thought
					? res.status(404).json({ message: "Error❗⛔ Failed to create thought❗⛔"})
					: Users.findOneAndUpdate(
							{ username: thought.username },
							{ $push: { thoughts: thought._id } },
							{ new: true }
					  ).then((user) => console.log(`Success✅ Thought has been added to ${user}`));
				res.json(thought);
			})
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
//GET THOUGHTS//
	getThoughts(req, res) {
		Thoughts.find({})
			.populate({ path: "reactions", select: "reactionBody" })
			.then((thoughts) => res.json(thoughts))
			.catch((error) => res.status(500).json(error));
	},
//GET SINGLE THOUGHT//
	getThoughtById(req, res) {
		Thoughts.find({ _id: req.params.thoughtId })
			.then((thought) => {
				!thought
					? res
							.status(404)
							.json({ message: "Error❗⛔ Failed to locate thought❗⛔" })
					: res.json({
							message: `Displaying: ${req.params.thoughtId}`,
							thoughtData: thought,
					  });
			})
			.catch((error) => res.status(500).json(error));
	},

//UPDATE THOUGHT//
	updateThought(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $set: { thoughtText: req.body.thoughtText } },
			{ new: true }
		).then((thought) =>
			!thought
				? res.status(404).json({ message: "Error❗⛔ Failed to update thought❗⛔"})
				: res.json(thought)
		);
	},
//ADD REACTION//
	addReaction(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $push: { reactions: req.body } }
		).then((reaction) =>
			!reaction
				? res
						.status(404)
						.json({ message: "Error❗⛔ Failed to locate thought via ID❗⛔"})
				: res.json(reaction)
		);
	},

//DELETE THOUGHT//
	deleteOneThought(req, res) {
		Thoughts.findOneAndDelete({ _id: req.params.thoughtId })
			.then((thought) =>
				!thought
					? res
							.status(404)
							.json({ message: "Error❗⛔ Thought ID does not exist❗⛔" })
					: res.json({
							message: `Warning❗⛔ Successfully deleted ❌: ${req.params.thoughtId}`,
							thoughtData: thought,
					  })
			)
			.catch((error) => res.status(500).json(error));
	},
//DELETE REACTION//
	deleteReaction(req, res) {
		Thoughts.findOneAndUpdate(
			{ _id: req.params.thoughtId },
			{ $pull: { reactions: { reactionId: req.params.reactionId } } }
		).then((reaction) =>
			!reaction
				? res
						.status(404)
						.json({ message: "Error❗⛔ Failed to locate reaction via ID❗⛔" })
				: res.json({
						message: `Warning❗⛔ Successfully deleted ❌: ${req.params.reactionId}`,
						reactionData: reaction,
				  })
		);
	},
};