const { Schema, Types, model } = require("mongoose");

const userSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      default: () => new Types.ObjectId(),
    },
    username: {
      type: String,
      required: true,
      max_length: 50,
    },
    email: {
      type: String,
      required: true,
      match: [/^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/, "Please enter a valid email address!📧"],
    },
    friends: {
      type: String,
      required: true,
      max_length: 50,
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "thought",
      }
    ],
  },
  {
    toJSON: {
      getters: true,
      versionKey: false,
    },
  }
);

const User = model("user", userSchema);

module.exports = User;