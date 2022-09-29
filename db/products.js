const client = require("./client");
//PRODUCTS ARE SIMILAR TO ACTIVITIES ON FITNESS TRACKER

//admin can add a product
async function createProduct({
    name,
    description,
    price,
    inStock,
    categoryId,
    image_url
    }) {
    try {
      const { rows: [product] } = await client.query(`
      INSERT INTO products (name, description, price, "inStock", "categoryId", image_url)
      VALUES ($1, $2, $3, $4, $5, $6)
      ON CONFLICT (name) DO NOTHING
      RETURNING *;
    `, [name, description, price, inStock, categoryId, image_url]);
  
      return product;
    }
    catch (error) {
      throw error;
    }
}
  
async function getAllProducts() {
    try {
        const { rows } = await client.query(`
            SELECT * FROM products;
        `)
        return rows;
    }
    catch (error) {
        throw error;
    }
}

async function getProductById(id) {
  try {
    const { rows: [product] } = await client.query(`
      SELECT * FROM products
      WHERE id = $1
    `,[id])
    
    return product;
  }
  catch (error) {
   
  }
}

//getProductByName | like getActivityByName(name), not sure we need this

//attachProductsToCarts(carts) | like  attachActivitiesToRoutines(routines) 
async function attachProductsToCarts(cartId) {
  try {
    const {rows} = await client.query(`
      SELECT products.*, orders.quantity, orders."cartId", orders.price, orders.id AS "orderId"
      FROM products
      JOIN orders ON products.id = orders."productId"
      WHERE orders."cartId" = $1
    `, [cartId]);
      return rows;
    }
  catch (error) {
    console.error(error)
    throw error;
  }
}

//updateProduct | like  updateActivity({ id, ...fields }), admin can update a product

//admin can delete a product?

//do we need to do something for product category?

module.exports = {
    createProduct,
    getAllProducts,
    getProductById,
    attachProductsToCarts
};