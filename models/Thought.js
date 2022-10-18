const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280,
      minlength: 10,
      default: "Check this out...!"
    },
    createdAt: {
			type: Date,
			default: Date.now(),
			get: (date) => formatDate(date),
    },
    users: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      versionKey: false,
    },
    id: false,
  }
);

const Thought = model("thought", thoughtSchema);

module.exports = Thought;