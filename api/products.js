const express = require("express");
const productsRouter = express.Router();
const {
    getAllProducts,
    //add other functions here
} = require("../db");

//products related api endpoints below
  
productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
      console.log("PRODUCTSSSS-->", products)
      res.send(products);
    } catch (error) {
      next(error);
    }
});

// /:productsId endpoints here

module.exports = productsRouter;
  


