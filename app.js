const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");

//swagger documentation

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//cookies and files middlewares
app.use(cookieParser());

//routes
const user = require("./routes/userRoutes");
const notes = require("./routes/noteRoutes");

app.use("/api/v1", user);
app.use("/api/v1", notes);

app.get("/", (req, res) => {
	res.status(200).send("Hello BYE BYE");
});

module.exports = app;
