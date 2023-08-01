const express = require("express");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const authRoutes = require("./routes/authRoutes.js");
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

dotenv.config({ path: ".env" });

mongoose
	.connect(process.env.MONGO_URI, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
	})
	.then(() => {
		console.log("DB Connetion Successful");
	})
	.catch((err) => {
		console.log(err.message);
	});

app.listen(9000, (err) => {
	if (err) {
		console.log(err);
	} else {
		console.log("Server Started Successfully.");
	}
});

app.use(
	cors({
		origin: ["http://localhost:3000"],
		methods: ["GET", "POST"],
		credentials: true,
	})
);

app.use(cookieParser());

app.use(express.json());
app.use("/", authRoutes);
