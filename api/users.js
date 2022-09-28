const express = require("express");
const usersRouter = express.Router();
const { requireUser, requireAdmin } = require("./utils");
const {
  createUser,
	getUser,
	getAllUsers,
  getUserByEmail,
	getUserById,
	getCartByUser,
	updateUser,
	createUserCart
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
			res.status(401).send({
				error: "error",
				name: "UserExistsError",
				message: `User ${email} is already taken.`,
			});
		}

		if (password.length < 8) {
			res.status(401).send({
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
		res.status(401).send(error);
	}
});


// /login enpoints
//usersRouter.post("/login", ...)
usersRouter.post("/login", async (req, res, next) => {
	const { email, password } = req.body;
	const SALT_COUNT = 10;

	const hashedPassword = await bcrypt.hash(password, SALT_COUNT);
	const isValid = await bcrypt.compare(password, hashedPassword);
	
	if (!email || !password) {
		res.status(401).send({
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
			res.status(401).send({
				name: "IncorrectCredentialsError",
				message: "Email or password is incorrect",
			});
		}
	} catch (error) {
		res.status(401).send(error);
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
				res.status(401).send(error);
			}
		} else {
			res.status(401).send({
				error: "Error",
				name: "NoToken",
				message: "You must be logged in to perform this action",
			});
		}
	} catch (error) {
		res.status(401).send(error);
	}
});

//look at usersRouter.get("/:username/routines", in fitness tracker
//right now req.params only contains email...
//this needs work
usersRouter.get("/:id/carts", async (req, res, next) => {
	try {
		const email = req.params;
		// console.log("req.user", req.user)
		console.log("req.params", req.params)
		console.log("email.email", email.email)
	
	//if isPurchased is false, return their current cart
		const response = await getCartByUser(email.email);
		res.send(response);
		
	//if is Purchased is true, maybe it can return their order history
		
	} catch (error) {
		res.status(401).send(error);
	}
});

//usersRouter.post('/', to create a cart for a user (registered?), uses createCart
usersRouter.post("/", async (req, res, next) => {
	try {
	  const { email } = req.body;
	  const newCart = await createUserCart({ email });
	  console.log({newCart, line:176})
	  res.send(newCart);
	} catch (error) {
	  next(error);
	}
  });


//are there any other endpoints specific to a user?
//maybe usersRouter.get("/:userId/mycart" or "/:userId/orderhistory" something like this 
//will figure this part out


//usersRouter.patch for /me/:userId for profile
//usersRouter.get "/all" for admin profile
//usersRouter.get /:userId/profile

module.exports = usersRouter;