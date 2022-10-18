const router = require("express").Router();
//USER CONTROLLER --> API ROUTES//
  const {
    getUsers,
    getSingleUser,
    createUser,
    updateUser,
    deleteUser,
    addFriendToFriendList,
    removeFriendFromFriendList,
  } = require("../../controllers/userController");

//API/USERS//
  router.route("/")
    .get(getUsers)
    .post(createUser);

//API/USERS/:USERID//
  router.route("/:id")
    .get(getSingleUser)
    .put(updateUser)
    .delete(deleteUser);

//API/USERS:ID/FRIENDS/FRIENDS:ID//
  router.route("/:userId/friends/:friendId")
    .post(addFriendToFriendList)
    .delete(removeFriendFromFriendList);

module.exports = router;