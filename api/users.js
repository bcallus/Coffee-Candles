const express = require("express");
const usersRouter = express.Router();
//require db functions here:
const {
    createUser,
    getUserByEmail
} = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

// users api endpoints here

// /register endpoints
//usersRouter.post("/signup", ...)


// /login enpoints
//usersRouter.post("/login", ...)
usersRouter.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	const SALT_COUNT = 10;

	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	const isValid = await bcrypt.compare(password, hashedPassword);
	if (! email|| !password) {
		next({
			name: "MissingCredentialsError",
			message: "Please provide both an email and a password",
		});
	}

	try {
		const user = await getUserByEmail(email);

		if (user && isValid) {
			const token = jwt.sign(
				{
                    email: email,
					id: user.id,
				},
				process.env.JWT_SECRET
			);
			res.send({
				token: token,
				user: user,
				message: "you're logged in!",
			});

			return token;
		} else {
			next({
				name: "IncorrectCredentialsError",
				message: "Email or password is incorrect",
			});
		}
	} catch (error) {
		next(error);
	}
});

// /me endpoints
//usersRouter.get("/me", ...)

module.exports = usersRouter;