const apiRouter = require("express").Router();

// home page endpoints?

//jwt stuff here

//define routes below:
const productsRouter = require('./products');
apiRouter.use("/products", productsRouter);

const usersRouter = require('./users');
apiRouter.use("/users", usersRouter);

//add error handlers below:
apiRouter.use("*", (req, res) => {
    res.status(404);
    res.send({ message: "route not found" });
});

module.exports = apiRouter;