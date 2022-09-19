const client = require("./client");

async function createOrder({
    productId,
    cartsId,
    quantity,
    authenticated,
    price
  }) {
    try {
      const { rows: [order] } = await client.query(`
      INSERT INTO orders ("productId", "cartsId", quantity, authenticated, price)
      VALUES ($1, $2, $3, $4, $5)
      RETURNING *;
    `, [productId, cartsId, quantity, authenticated, price]);
  
      return order;
    }
    catch (error) {
      throw error;
    }
  }

module.exports = {
	createOrder
};