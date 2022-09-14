const express = require("express");
const usersRouter = express.Router();

//require db functions here:
const {
	
} = require("../db");

// users api endpoints here

// /register endpoints
//usersRouter.post("/signup", ...)

// /login enpoints
//usersRouter.post("/login", ...)

// /me endpoints
//usersRouter.get("/me", ...)

module.exports = usersRouter;