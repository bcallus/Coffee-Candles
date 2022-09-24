const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  getProductById
    //add other functions here
} = require("../db");
const { requireAdmin } = require("./utils")

//products related api endpoints below
  
//get all products for when user visits /products page
productsRouter.get("/", async (req, res, next) => {
    try {
      const products = await getAllProducts();
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
    console.log({productId,line:27})
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});


// POST /api/products
productsRouter.post("/", requireAdmin, async (req, res, next) => {
  const { name, description, price, inStock } = req.body;
  
  try {
    const newProduct = await createProduct({
      name,
      description,
      price,
      inStock,
  });
  res.send(newProduct);
} catch ({ name, message }) {
  next({ name, message, status:401 });
}
});

module.exports = productsRouter;
  


