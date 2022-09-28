const express = require("express");
const productsRouter = express.Router();
const {
  getAllProducts,
  getProductById,
  addProductToCart
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

//getting product by Id for when a user clicks on a specific product, rerouting them to /products/:productId
productsRouter.get("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.params
    const product = await getProductById(productId);
    res.send(product);
  } catch (error) {
    next(error);
  }
});

//for when add to cart is clicked
productsRouter.post("/:productId", async (req, res, next) => {
  try {
    const { productId } = req.body
    console.log({ productId, line: 37 })
    // const product = await getProductById(productId)
    // console.log({ product, line:39 })
    const newOrder = await addProductToCart({ productId });
    console.log({newOrder, line:41})
    res.send(newOrder);
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
  


