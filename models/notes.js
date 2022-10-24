const mongoose = require("mongoose");

const noteSchema = new mongoose.Schema({
	message: {
		type: String,
	},
	user: {
		type: mongoose.Schema.ObjectId,
		ref: "User",
		required: true,
	},
});

module.exports = mongoose.model("Note", noteSchema);
