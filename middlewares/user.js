const User = require("../models/user");
const jwt = require("jsonwebtoken");
const CustomError = require("../utils/customError");

exports.isLoggedIn = async (req, res, next) => {
	try {
		const token =
			req.cookies.token || req.header("Authorization").replace("Bearer ", "");

		if (!token) {
			return next(new CustomError("Not Authorized", 401));
		}
		const decoded = await jwt.verify(token, process.env.JWT_SECRET);

		req.user = await User.findById({ _id: decoded.id });

		next();
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.customRole = (...roles) => {
	return (req, res, next) => {
		if (!roles.includes(req.user.role)) {
			return next(
				new CustomError("You are not allowed for this resource", 402)
			);
		}
		next();
	};
};
