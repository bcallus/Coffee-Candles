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
        // console.log("rows from getAllProducts-->", rows)
        return rows;
    }
    catch (error) {
        throw error;
    }
}

async function getProductById(id) {
  console.log({id, line:42})
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
//probably have to fix what this is selecting?
async function attachProductsToCarts(carts) {
  try {
    const cartId = carts.map(cart => cart.id)

    if (!cartId?.length) return

    const {rows} = await client.query(`
      SELECT products.*, orders.quantity, orders."cartId", orders.price, orders.id AS "orderId"
      FROM products
      JOIN orders ON products.id = orders."productId"
      WHERE orders."cartId" IN (${cartId.join(",")})
    `);

    const data = carts.map(cart => {
      orders = rows.filter(row => {
        return row.cartId === cart.id;
      })
      return cart;
    })

    return data;
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