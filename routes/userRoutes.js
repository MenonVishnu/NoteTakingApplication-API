const express = require("express");
const {
	signUp,
	dummy,
	login,
	getAllUser,
	updateUser,
	adminUpdateUser,
	adminDeleteUser,
	logout,
	getDetail,
} = require("../controllers/userController");
const { isLoggedIn, customRole } = require("../middlewares/user");

const router = express.Router();

//admin routes
//protection of routes is remaining
router
	.route("/admin/getallusers")
	.get(isLoggedIn, customRole("admin"), getAllUser);
router
	.route("/admin/deleteuser/:id")
	.delete(isLoggedIn, customRole("admin"), adminDeleteUser);
router
	.route("/admin/updateuser/:id")
	.put(isLoggedIn, customRole("admin"), adminUpdateUser);

//user routes
//protection of routes is remaining
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/logout").get(isLoggedIn, logout);
router.route("/updateuser").put(isLoggedIn, updateUser);
router.route("/getuserdetail").get(isLoggedIn, getDetail);

router.route("/test").get(dummy);

module.exports = router;
