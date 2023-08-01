const express = require("express");

const app = express();

app.get("/", (req, res) => {
	res.send("Hello, This is start of the application");
});

app.listen(process.env.PORT || 9000);
