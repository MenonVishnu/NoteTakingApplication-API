const express = require("express");
const {
	signUp,
	dummy,
	login,
	getAllUser,
	updateUser,
	adminDeleteUser,
} = require("../controllers/userController");
const router = express.Router();

//admin routes
router.route("/admin/getallusers").get(getAllUser);
router.route("/admin/deleteuser/:id").delete(adminDeleteUser);

//user routes
router.route("/signup").post(signUp);
router.route("/login").post(login);
router.route("/updateuser/:id").put(updateUser);

router.route("/test").get(dummy);

module.exports = router;
