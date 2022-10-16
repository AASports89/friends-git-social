const router = require("express").Router();

const {
	createUser,
	getUsers,
	getById,
	deleteOneUser,
	addFriend,
	deleteFriend,
	updateUser,
} = require("../../userController");

//GET USER LIST --> API/USER//
router.route("/").get(getUsers);

//CREATE USER --> API/USER/CREATE//
router.route("/create").post(createUser);

//GET SINGLE USER --> API/USER/ID//
router.route("/:id").get(getById).delete(deleteOneUser).put(updateUser);

//ADD & DELETE FRIEND OF USER//
router.route("/:userId/friends/:friendId").put(addFriend).delete(deleteFriend);

module.exports = router;