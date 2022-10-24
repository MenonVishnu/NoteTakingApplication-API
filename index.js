const app = require("./app");
const connectDatabase = require("./config/db");
require("dotenv").config();

connectDatabase();

app.listen(process.env.PORT, () => {
	console.log(`Server Running in Port: ${process.env.PORT}`);
});
