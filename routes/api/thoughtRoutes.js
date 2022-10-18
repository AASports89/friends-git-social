const router = require("express").Router();
//THOUGHT CONTROLLER --> API ROUTES//
const {
  getThoughts,
  getSingleThought,
  createThought,
  updateThought,
  deleteThought,
  addReactionToAThought,
  removeReactionFromAThought,
} = require("../../controllers/thoughtController");

//API/THOUGHTS//
router.route("/")
.get(getThoughts).post(createThought);

//API/THOUGHTS/:/USERID//
// router.route("/:userId")
// .post(createThought);

//API/THOUGHTS/THOUGHT:ID//
router.route("/:thoughtId")
.get(getSingleThought)
.put(updateThought)
.delete(deleteThought);

//API/THOUGHTS/THOUGHTID//REACTIONS//
router.route("/:thoughtId/reactions")
.post(addReactionToAThought);

//API/THOUGHTS/THOUGHTID//REACTIONS/REACTIONID//
router.route('/:thoughtId/reactions/:reactionId')
.delete(removeReactionFromAThought);

module.exports = router;