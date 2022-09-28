const client = require("./client");
const {
  getProductById //add other functions here
} = require("./products");
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

  //getOrderItemById | like getRoutineActivityById(id)
  async function getOrderItemById(id) {
    try {
      const {
        rows: [orderItems],
      } = await client.query(
        `
      SELECT * 
      FROM "orderItems"
      WHERE id = $1;
      `,
        [id]
      );
      console.log("orderItemsById from getOrderItemById-->", orderItems)
      return orderItems;
    } catch (error) {
      throw error;
    }
  }

  //addProductToCart | like addActivityToRoutine({routineId,activityId,count,duration}), actually inserting into orders table
async function addProductToCart({ cartId, productId }) {
    try {
      console.log({ productId, line: 47 })
      const product = await getProductById(productId)
      console.log({ product, line: 49 })
      const quantity = 1

      const price = await client.query(`
        SELECT prroducts.price FROM products
        WHERE products.id = $1;
      `, [productId])
      console.log({price, line:59})

      
    //   const { rows: [order] } = await client.query(`
    //   INSERT INTO orders ("productId", "cartId", quantity, price)
    //   VALUES ($1, $2, $3, $4)
    //   RETURNING *;
    // `, [productId, cartId, quantity, price]);
  
    //   console.log("order from addProductToCart-->", order)
      // console.log({ order, line: 58 })
      return order;
    } catch (error) {
      throw error;
    }
  }

 //getOrdersByCartId | like getRoutineActivitiesByRoutine({id})

  //updateOrders | like updateRoutineActivity ({id, count, duration}), aka editing items in cart
  //updateCart by cartId ? for a user to edit their cart | like  updateRoutine({id, ...fields})
async function updateOrder({id, ...fields}) {
  const setString = Object.keys(fields).map((key, index)=>`"${key}"=$${index + 1}`).join(",");
  try{
  const {rows: [order]} = await client.query(`
      UPDATE orders
      SET ${setString}
      WHERE id=${id}
      RETURNING *;
  `, Object.values(fields));
      
  console.log("order from updateOrder-->", order)
  return order
  }catch(error){console.error(error)}
}
  
//deleteOrders | like  destroyRoutineActivity(id), aka deleting items in cart
async function destroyOrder(id) {
  await client.query(`
    DELETE FROM orders
    WHERE orders."cartId" = ${id}
    `);
  await client.query(`
    DELETE FROM carts
    WHERE id = ${id}
    `);
  }

  //deleteOrders | like  destroyRoutineActivity(id), aka deleting items in cart

  //canEditOrders | like  canEditRoutineActivity(routineActivityId, userId), maybe this verifys that a user/guest can edit their own cart?

module.exports = {
  createOrder,
  addProductToCart,
  updateOrder,
  destroyOrder
};