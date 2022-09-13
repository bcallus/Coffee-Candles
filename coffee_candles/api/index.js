const apiRouter = require("express").Router();

// home page endpoints?

//jwt stuff here

//define routes below:
apiRouter.use("/products", require("./productsRouter"));

//add error handlers below:

module.exports = apiRouter;