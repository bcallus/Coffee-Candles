const express = require('express');
const apiRouter = require("express").Router();
const { getUserById } = require("../db");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

apiRouter.get('/health', async (req, res) => {
    const message = 'All is well!';
    res.send({ message });
});

//jwt stuff here
apiRouter.use(async (req, res, next) => {
    const prefix = 'Bearer ';
    const auth = req.header('Authorization');

    if (!auth) {
        next();
    } else if (auth.startsWith(prefix)) {
        const token = auth.slice(prefix.length);

        try {
            const { id } = jwt.verify(token, JWT_SECRET);

            if (id) {
                req.user = await getUserById(id);
                next();
            }
        }
        catch ({ name, message }) {
            next({ name, message });
        }
    } else {
        next({
            name: 'AuthorizationHeaderError',
            message: `Authorization token must start with ${prefix}`
        });
    }
});

//define routes below:
const productsRouter = require('./products');
apiRouter.use("/products", productsRouter);

const usersRouter = require('./users');
apiRouter.use("/users", usersRouter);

const cartsRouter = require('./carts');
apiRouter.use("/carts", cartsRouter);

const adminRouter = require('./admin');
apiRouter.use("/admin", adminRouter);

apiRouter.use("*", (req, res) => {
    res.status(404);
    res.send({ message: "route not found" });
});

module.exports = apiRouter;