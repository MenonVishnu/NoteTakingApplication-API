const notes = require("../models/notes");
const Notes = require("../models/notes");
const CustomError = require("../utils/customError");

exports.addNote = async (req, res, next) => {
	try {
		const { message } = req.body;
		if (!message) {
			return next(new CustomError("Empty Message, Please Add Something", 403));
		}
		req.body.user = req.user._id;
		const note = await Notes.create(req.body);
		res.status(200).json({
			success: true,
			note,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.updateNote = async (req, res, next) => {
	try {
		const note_id = req.params.id;

		const note = await Notes.findById({ _id: note_id });

		if (!note) {
			return next(new CustomError("No Note Found!!", 404));
		}

		const notes = await Notes.findByIdAndUpdate({ _id: note_id }, req.body, {
			new: true,
		});

		res.status(200).json({
			success: true,
			notes,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.deleteNote = async (req, res, next) => {
	try {
		const note_id = req.params.id;
		const note = await Notes.findById({ _id: note_id });
		if (!note) {
			return next(new CustomError("No Note Found!!", 404));
		}

		await note.remove();

		res.status(200).json({
			success: true,
			message: "Note deleted",
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.getOneNote = async (req, res, next) => {
	try {
		const note_id = req.params.id;
		const note = await Notes.findById({ _id: note_id });
		if (!note) {
			return next(new CustomError("No Note found with this id", 404));
		}
		res.status(201).json({
			success: true,
			note,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.getAllnotes = async (req, res, next) => {
	try {
		const user_id = req.user._id;
		const allNotes = await Notes.find({});
		const notes = allNotes.filter((note) => note.user.equals(user_id));
		res.status(200).json({
			success: true,
			notes,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};

exports.adminGetAllNotes = async (req, res, next) => {
	try {
		const notes = await Notes.find({});
		res.status(201).json({
			success: true,
			notes,
		});
	} catch (error) {
		console.log(error);
		res.status(404).json({
			error: true,
			message: error.stack,
		});
	}
};
