const { Schema, model } = require("mongoose");
const { formatDate } = require("../utils/dateFormat");
const reactionSchema = require("./Reaction");

const thoughtSchema = new Schema(
	{
		thoughtText: {
			type: String,
			required: true,
			min_length: 1,
			max_length: 280,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			get: (date) => formatDate(date),
		},
		username: {
			type: String,
			required: true,
		},
		reactions: [reactionSchema],
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
		versionKey: false,
	}
);

const Thoughts = model("thought", thoughtSchema);

module.exports = Thoughts;