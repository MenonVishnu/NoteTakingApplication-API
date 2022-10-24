const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const validator = require("validator");

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minLength: 3,
	},
	email: {
		type: String,
		required: true,
		validate: [validator.isEmail, "Please enter valid email address!!"],
		minLength: 4,
		unique: true,
	},
	role: {
		type: String,
		default: "user",
	},
	password: {
		type: String,
		required: [true, "Please provide with password"],
		minLength: [8, "Password must contain minimum 8 charachters"],
		select: false,
	},
});

userSchema.pre("save", async function (next) {
	if (!this.isModified("password")) {
		return next();
	}
	this.password = await bcrypt.hashSync(this.password, 10);
});

userSchema.methods.getJwtToken = async function () {
	return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
		expiresIn: process.env.JWT_EXPIRY,
	});
};

userSchema.methods.validatePassword = async function (userSendPassword) {
	return await bcrypt.compare(userSendPassword, this.password);
};

module.exports = mongoose.model("User", userSchema);
