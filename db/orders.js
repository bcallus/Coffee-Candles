const client = require("./client");

async function createOrder({
    productId,
    cartsId,
    quantity,
    price
  }) {
    try {
      const { rows: [order] } = await client.query(`
      INSERT INTO orders ("productId", "cartsId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, cartsId, quantity, price]);
  
      return order;
    }
    catch (error) {
      throw error;
    }
  }

  //getOrderById

  //getOrderByCartId ?? do we need this

  //addProductToCart insert into orders?

  //updateOrder

  //deleteOrder

module.exports = {
	createOrder
};