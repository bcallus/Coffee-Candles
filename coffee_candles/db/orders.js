const client = require("./client");

async function createOrder({
    orderId,
    quantity,
    authenticated
    }) {
    try {
      const { rows: [order] } = await client.query(`
      INSERT INTO orders ("orderId", quantity, authenticated)
      VALUES ($1, $2, $3)
      RETURNING *;
    `, [orderId, quantity, authenticated]);
  
      return order;
    }
    catch (error) {
      throw error;
    }
  }

module.exports = {
	createOrder
};