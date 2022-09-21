const client = require("./client");
//ORDERS ARE SIMILER TO ROUTINE_ACTIVITES ON FITNESS TRACKER (also they are like "cart items", or carts with products in them)

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

  //getOrderById | like getRoutineActivityById(id)

  //addProductToCart | like addActivityToRoutine({routineId,activityId,count,duration}), actually inserting into orders table

 //getOrdersByCart | like getRoutineActivitiesByRoutine({id})

  //updateOrders | like updateRoutineActivity ({id, count, duration}), aka editing items in cart

  //deleteOrders | like  destroyRoutineActivity(id), aka deleting items in cart

  //canEditOrders | like  canEditRoutineActivity(routineActivityId, userId), maybe this verifys that a user/guest can edit their own cart?

module.exports = {
	createOrder
};