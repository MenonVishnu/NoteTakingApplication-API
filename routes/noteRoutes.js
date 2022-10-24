const express = require("express");
const {
	addNote,
	updateNote,
	deleteNote,
	getOneNote,
	getAllnotes,
	adminGetAllNotes,
} = require("../controllers/notesController");
const { isLoggedIn, customRole } = require("../middlewares/user");
const router = express.Router();

//admin routes
router
	.route("/admin/notes")
	.get(isLoggedIn, customRole("admin"), adminGetAllNotes);

//user routes
router.route("/addnote").post(isLoggedIn, addNote);
router
	.route("/note/:id")
	.get(isLoggedIn, getOneNote)
	.put(isLoggedIn, updateNote)
	.delete(isLoggedIn, deleteNote);
router.route("/notes").get(isLoggedIn, getAllnotes);

module.exports = router;
