const client = require("./client");

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
        // console.log("rows from getAllProducts-->", rows)
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
      WHERE id = ${id}
    `)

    return product;
  }
  catch (error) {
    throw error;
  }
}

//admin can update a product

//admin can delete a product

module.exports = {
    createProduct,
    getAllProducts,
    getProductById
};