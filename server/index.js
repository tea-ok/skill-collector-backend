const express = require("express");
const session = require("express-session");
const bodyParser = require("body-parser");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const cors = require("cors");

/** SESSION MIDDLEWARE **/
app.use(
	session({
		secret: process.env.SESSION_SECRET,
		resave: false,
		saveUninitialized: true,
		cookie: {
			sameSite: "lax",
		},
	})
);

app.use(
	cors({
		origin: "http://localhost:3000",
		methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
		credentials: true,
	})
);

/** BODY PARSER MIDDLEWARE **/
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/** ROUTES **/
const authRouter = require("./routes/auth");
const skillsRouter = require("./routes/skills");
const userSkillsRouter = require("./routes/userSkills");

app.use("/auth", authRouter);
app.use("/skills", skillsRouter);
app.use("/userSkills", userSkillsRouter);

/** STARTING THE SERVER **/
app.listen(port, () => console.log(`Server running on port ${port}`));
