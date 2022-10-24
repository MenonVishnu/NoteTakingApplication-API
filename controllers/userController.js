const User = require("../models/user");
const cookieToken = require("../utils/cookieToken");
const CustomError = require("../utils/customError");

//admin routes
exports.getAllUser = async (req, res, next) => {
	try {
		const user = await User.find();

		res.status(200).json({
			success: true,
			users: user,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.adminDeleteUser = async (req, res, next) => {
	try {
		const user_id = req.params.id;

		const user = await User.findById({ _id: user_id });
		if (!user) {
			return next(new CustomError("No User found", 401));
		}

		user.remove();

		res.status(200).json({
			success: true,
			message: "User Removed!!",
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

//user routes
exports.signUp = async (req, res, next) => {
	try {
		const { name, email, password } = req.body;
		if (!name || !email || !password) {
			return next(
				new CustomError("Please provide Name, Email and Password", 401)
			);
		}

		const user = await User.create({
			name,
			email,
			password,
		});

		cookieToken(user, res);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.login = async (req, res, next) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			return next(
				new CustomError("Please provide with email and password", 401)
			);
		}
		const user = await User.findOne({ email }).select("+password");

		if (!user) {
			return next(new CustomError("Please check your email and password", 401));
		}

		const isPasswordCorrect = await user.validatePassword(password);

		if (!isPasswordCorrect) {
			// console.log(email, password);
			return next(new CustomError("Please check your email and password", 402));
		}

		cookieToken(user, res);
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.updateUser = async (req, res, next) => {
	try {
		const user_id = req.params.id;
		const user = await User.findByIdAndUpdate({ _id: user_id }, req.body, {
			new: true,
		});
		if (!user) {
			return next(new CustomError("Failed to Update", 401));
		}

		res.status(200).json({
			success: true,
			user: user,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.dummy = async (req, res, next) => {
	res.send("Working Dumbb!!");
};
