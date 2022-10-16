const { Schema, Types, model } = require("mongoose");
const { formatDate } = require("../utils/dateFormat");

const reactionSchema = new Schema(
	{
		reactionId: {
			type: Schema.Types.ObjectId,
			default: () => new Types.ObjectId(),
		},
		reactionBody: {
			type: String,
			required: true,
			max_length: 280,
		},
		username: {
			type: String,
			required: true,
		},
		createdAt: {
			type: Date,
			default: Date.now(),
			get: (date) => formatDate(date),
		},
	},
	{
		toJSON: {
			getters: true,
		},
		id: false,
	}
);

module.exports = reactionSchema;