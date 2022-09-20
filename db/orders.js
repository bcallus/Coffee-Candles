const client = require("./client");

async function createOrder({
    productId,
    quantity,
    authenticated,
    price
    }) {
    try {
      const { rows: [order] } = await client.query(`
      INSERT INTO orders ("productId", quantity, authenticated, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, quantity, authenticated, price]);
  
      return order;
    }
    catch (error) {
      throw error;
    }
  }

  //getAllOrders function

  //getOrdersByUserId function

  //getOrderByOrderId function

  // updateOrder function

module.exports = {
	createOrder
};