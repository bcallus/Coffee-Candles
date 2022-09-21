const client = require("./client");
//ORDERS ARE SIMILER TO ROUTINE_ACTIVITES ON FITNESS TRACKER (also they are like "cart items", or carts with products in them)

async function createOrder({
    productId,
    cartId,
    quantity,
    price
  }) {
    try {
      const { rows: [order] } = await client.query(`
      INSERT INTO orders ("productId", "cartId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, cartId, quantity, price]);
  
      return order;
    }
    catch (error) {
      throw error;
    }
  }

  //getOrderById | like getRoutineActivityById(id)

  //addProductToCart | like addActivityToRoutine({routineId,activityId,count,duration}), actually inserting into orders table
  async function addProductToCart({
    productId,
    cartId,
    quantity,
    price
  }) {
    try {
      const { rows: [order] } = await client.query(`
      INSERT INTO orders ("productId", "cartId", quantity, price)
      VALUES ($1, $2, $3, $4)
      RETURNING *;
    `, [productId, cartId, quantity, price]);
  
      console.log("order from addProductToCart-->", order)
      return order;
    }
    catch (error) {
      throw error;
    }
  }

 //getOrdersByCart | like getRoutineActivitiesByRoutine({id})

  //updateOrders | like updateRoutineActivity ({id, count, duration}), aka editing items in cart

  //deleteOrders | like  destroyRoutineActivity(id), aka deleting items in cart

  //canEditOrders | like  canEditRoutineActivity(routineActivityId, userId), maybe this verifys that a user/guest can edit their own cart?

module.exports = {
  createOrder,
  addProductToCart
};