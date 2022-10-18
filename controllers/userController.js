const { User, Thoughts } = require("../models");

const userCount = async () =>
  User.aggregate()
    .count("userCount")
      .then((numberOfUsers) => numberOfUsers);

module.exports = {
//GET ALL USERS//
  getUsers(req, res) {
    User.find({})
      .then(async(users) => {
        const userObj = {
        users,
        userCount: await userCount(),
      };
    return res.json(userObj);
    })
      .populate({ path: "friends", select: "username" })
      .then((users) => res.json(users))
        .catch((error) => {
        console.log(error);
        res.status(500).json(error);
      });
  },

//GET SINGLE USER VIA ID//
  getSingleUser(req, res) {
    User.find({ _id: req.params.id })
      .then((user) =>
        !user
          ? res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔" })
          : res.json({
            message: `Displaying: ${req.params.id}`,
            userData: user,
          })
      )
    .catch((error) => res.status(500).json(error));
  },

//CREATE USER//
  createUser(req, res) {
    User.create(req.body)
      .then((user) =>
        res.json({ message: "User successfully created ✅", userData: user })
      )
    .catch((error) => {
      console.log(error);
      return res.status(500).json(error);
    });
  },

//UPDATE USER//
  updateUser(req, res) {
    User.findOneAndUpdate(
			{ _id: req.params.id },
			{ $set: { username: req.body.username, email: req.body.email } },
			{ runValidators: true, new: true }
		).then((user) =>
			!user
				? res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔" })
				: res.json(user)
		);
	},
   
//DELETE USER//
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.id })
    .then((user) => 
    !user 
        ? res.status(404).json({ message: "Error❗⛔ User does not exist❗⛔"})
        : Thoughts.findOneAndUpdate(
          { users: req.params.userId },
          { $pull: { users: req.params.userId } },
          { new: true }
        )
    )
  .then((course) =>
    !course
      ? res.status(404).json({
          message: "Warning❗⛔ User deleted❗❌ No thoughts found❗⛔",
        })
      : res.json({ message: `Warning❗⛔ User deleted❗❌`, userData: user })
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},

//ADD FRIEND --> USER//
  addFriendToFriendList(req, res) {
    User.findOneAndUpdate(
        { _id: req.params.userId },
        { $push: { friends: req.params.friendId } }
          ).then((user) =>
            !user
              ? res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔" })
              : res.json({ message: `${user.username} added friend successfully!✅`,
                  userData: user,
              })
        );
  },

//REMOVE FRIEND --> USER//
  removeFriendFromFriendList(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } }
        ).then((user) =>
          !user
            ? res.status(404).json({ message: "Error❗⛔ Friend ID does not exist❗⛔"  })
            : res.json({ message: `Warning❗⛔ ${user.username} removed friend❗❌`,
                userData: user,
              })
          );
    },
};