const { Users } = require("../models");

module.exports = {
//CREATE USER//
	createUser(req, res) {
		Users.create(req.body)
			.then((user) =>
				res.json({ message: `User successfully created✅`, userData: user })
			)
			.catch((error) => {
				console.log(error);
				return res.status(500).json(error);
			});
	},
//GET ALL USERS//
	getUsers(req, res) {
		Users.find({})
			.populate({ path: "friends", select: "username" })
			.then((users) => res.json(users))
			.catch((error) => {
				console.log(error);
				res.status(500).json(error);
			});
	},
//GET SINGLE USER//
	getById(req, res) {
		Users.find({ _id: req.params.id })
			.then((user) =>
				!user
					? res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔"})
					: res.json({
							message: `Displaying: ${req.params.id}`,
							userData: user,
					  })
			)
			.catch((error) => res.status(500).json(error));
	},

//UPDATE USER//
	updateUser(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { username: req.body.username, email: req.body.email } },
			{ runValidators: true, new: true }
		).then((user) =>
			!user
				? res.status(404).json({ message: "Error❗⛔ Unable to locate user for❗⛔"})
				: res.json(user)
		);
	},
//ADD FRIEND//
	addFriend(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $push: { friends: req.params.friendId } }
		).then((user) =>
			!user
				? res
						.status(404)
						.json({ message: "Error❗⛔ Unable to add friend, user does not exist❗⛔" })
				: res.json({
						message: `Success✅ ${user.username} friend added!`,
						userData: user,
				  })
		);
	},
//DELETE FRIEND//
	deleteFriend(req, res) {
		Users.findOneAndUpdate(
			{ _id: req.params.userId },
			{ $pull: { friends: req.params.friendId } }
		).then((user) =>
			!user
				? res
						.status(404)
						.json({ message: "Error❗⛔ Unable to delete friend, user does not exist❗⛔" })
				: res.json({
						message: `Warning❗⛔ ${user.username} friend deleted ❌❗`,
						userData: user,
				  })
		);
	},
//DELETE USER//
	deleteOneUser(req, res) {
		Users.findOneAndDelete({ _id: req.params.id })
			.then((user) =>
				!user
					? res.status(404).json({ message: "Error❗⛔ User does not exist❗⛔" })
					: res.json({ message: `Warning❗⛔ User deleted ❌❗`, userDate: user })
			)
			.catch((error) => res.status(500).json(error));
	},
};