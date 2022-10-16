const router = require("express").Router();
const {
	createThought,
	getThoughts,
	getThoughtById,
	updateThought,
	addReaction,
	deleteReaction,
	deleteOneThought,
} = require("../../thoughtController");

//GET THOUGHTS --> API/THOUGHTS//
router.route("/").get(getThoughts);

//CREATE THOUGHT --> API/CREATETHOUGHT//
router.route("/create").post(createThought);

//GET SINGLE THOUGHT & DELETE SINGLE THOUGHT --> API/THOUGHTID//
router
	.route("/:thoughtId")
	.get(getThoughtById)
	.put(updateThought)
	.delete(deleteOneThought);

//CREATE REACTION//
router.route("/:thoughtId/reaction").post(addReaction);

//DELETE EXISTING REACTION//
router.route("/:thoughtId/reactions/:reactionId").delete(deleteReaction);

module.exports = router;