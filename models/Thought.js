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
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    createdAt: {
			type: Date,
			default: Date.now(),
			get: (date) => formatDate(date),
    },
    reactions: [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
    },
    id: false,
  }
);

  thoughtSchema.virtual("reactionCount").get(function(){
  return this.reactions.length;
  })

const Thought = model("Thought", thoughtSchema);

module.exports = Thought;