const express = require("express");
const usersRouter = express.Router();
//require db functions here:
const {
    createUser,
    getUserByEmail,
    getUserById
} = require("../db");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { JWT_SECRET } = process.env;

// users api endpoints here

// /register endpoints
//usersRouter.post("/register", ...)
usersRouter.post("/register", async (req, res, next) => {
	const { email, password } = req.body;

	try {
		const _user = await getUserByEmail(email);

		if (_user) {
			next({
				error: "error",
				name: "UserExistsError",
				message: `User ${email} is already taken.`,
			});
		}

		if (password.length < 8) {
			next({
				error: "error",
				name: "PasswordLengthError",
				message: "Password Too Short!",
			});
		}

		const user = await createUser({ email, password });

		const SALT_COUNT = 10;

		const hashedPassword = await bcrypt.hash(password, SALT_COUNT);

		const token = jwt.sign(
			{
				id: user.id,
				email: email,
				password: hashedPassword,
			},
			process.env.JWT_SECRET,
			{
				expiresIn: "1w",
			}
		);

		res.send({
			message: "Thank you for signing up!",
			token: token,
			user: user,
		});
	} catch (error) {
		next(error);
	}
});


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
usersRouter.get("/me", async (req, res, next) => {
	const { authorization } = req.headers;
	const prefix = "Bearer ";
	try {
		if (authorization) {
			const token = authorization.slice(prefix.length);

			try {
				const { id } = jwt.verify(token, JWT_SECRET);

				if (id) {
					const user = await getUserById(id);
					
					res.send(user);
				}
			} catch (error) {
				next(error);
			}
		} else {
			res.status(401);
			next({
				error: "Error",
				name: "NoToken",
				message: "You must be logged in to perform this action",
			});
		}
	} catch (error) {
		next(error);
	}
});

//are there any other endpoints specific to a user?
//maybe usersRouter.get("/:userId/mycart" or "/:userId/orderhistory" something like this 
//will figure this part out

module.exports = usersRouter;