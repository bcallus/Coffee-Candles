const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  getProductById
    //add other functions here
} = require("../db");

//products related api endpoints below
  
//get all products for when user visits /products page
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
//getting product by Id for when a user clicks on a specific product, rerouting them to /products/:productId
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await getProductById(productId);
    // console.log("product-->", product)
    res.send(product);
  } catch (error) {
    next(error);
  }
});

module.exports = productsRouter;
  


