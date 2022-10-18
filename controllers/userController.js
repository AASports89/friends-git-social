const { ObjectId } = require('mongoose').Types;
const { User, Thought } = require("../models");

const userCount = async () =>
    User.aggregate()
      .count("userCount")
        .then((numberOfUsers) => numberOfUsers);

const friends = async (userId) =>
  User.aggregate([
      
      {
        $match: { _id: ObjectId(userId) },
      },
      {
        $unwind: "$friends",
      },
      {
        $group: { _id: userId, totalFriends: { $count: "$friends.user"} },
        },
    ]);

module.exports = {
//GET ALL USERS//
  getUsers( req, res ){
    User.find()
    .then(async(users) => {
      const userObj = {
        users,
        userCount: await userCount(),
      };
      return res.json(userObj);
    })
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},

//GET SINGLE USER VIA ID//
  getSingleUser(req, res){
    User.findOne({_id: req.params.userId})
    .select("-__v")
    .lean()
    .then(async (user) =>
    !user
      ? res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔" })
      : res.json({
        user,
        friends: await friends(req.params.userId),
      })
    )
    .catch((err) => {
      console.log(err);
      return res.status(500).json(err);
    });
},
//CREATE USER//
  createUsers(req, res) {
    User.create(req.body)
    .then((user) => res.json(user))
    .catch((err) => res.status(500).json(err));
  },
//UPDATE USER//
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    )
    .then((user) => {
      if (!user) {
        res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔"});
        return;
      }
      res.json(user);
    })
    .catch((err) => {
      res.status(400).json(err);
    });
  },
//DELETE USER//
  deleteUser(req, res) {
    User.findOneAndDelete({_id: req.params.userId})
    .then((user) => 
    !user 
        ? res.status(404).json({ message: "Error❗⛔ User does not exist❗⛔"})
        : Thought.findOneAndUpdate(
          { users: req.params.userId },
          { $pull: { users: req.params.userId } },
          { new: true }
        )
    )
  .then((course) =>
    !course
      ? res.status(404).json({
          message: 'Warning❗⛔ User deleted❗❌ No thoughts found❗⛔',
        })
      : res.json({ message: 'Warning❗⛔ User deleted❗❌' })
  )
  .catch((err) => {
    console.log(err);
    res.status(500).json(err);
  });
},
//ADD FRIEND --> USER//
  addFriendToFriendList(req, res) {
    console.log("Friend successfully added✅");
    console.log(req.body);
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.body }},
      { runValidators: true, new: true }
    )
    .then((user) =>
        !user
          ? res.status(404).json({ message: "Error❗⛔ User ID does not exist❗⛔"})
          : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
//REMOVE FRIEND --> USER//
  removeFriendFromFriendList(req, res) {
    User.findOneAndUpdate(
      { _id: params.userId },
      { $pull: { friends: { friendId: req.params.friendId }}},
      { runValidators: true, new: true }
    )
    .then((user) =>
        !user
          ? res.status(404).json({ message: "Error❗⛔ Friend ID does not exist❗⛔" })
          : res.json(user)
    )
    .catch((err) => res.status(500).json(err));
  },
};