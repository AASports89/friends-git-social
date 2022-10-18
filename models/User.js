const { Schema, model } = require("mongoose");
const friendSchema = require("./Friend");

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
      max_length: 50,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
			lowercase: true,
			trim: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address!📧"],
    },
    thoughts: [
			{
				type: Schema.Types.ObjectId,
				ref: "Thought",
			},
		],
		friends: [friendSchema],
  },
  {
    toJSON: {
      virtuals: true,
      getters: true,
      versionKey: false,
    },
    id: false,
});

  userSchema.virtual("friendCount").get(function () {
		  return this.friends.length;
  });

const User = model("User", userSchema);

module.exports = User;