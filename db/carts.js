const client = require("./client");
const { getUserByEmail } = require("./users");
const {
     attachProductsToCarts //add other functions here
  } = require("./products");
//CARTS ARE SIMILAR TO ROUTINES ON FITNESS TRACKER

//default for isPurchased is false, has to be updated to change cart to purchsed cart?
async function createUserCart({ email, isPurchased = false}) {
  try {
        const user = await getUserByEmail(email)
        const userId = user.id

        const { rows: [existingCart] } = await client.query(`
            SELECT * FROM carts
            WHERE carts."userId" = $1
            AND "isPurchased" = false
        `, [userId])
    
        if (existingCart) {
            return existingCart
        }
    
        const { rows: [carts] } = await client.query(`
            INSERT INTO carts("userId", "isPurchased")
            VALUES ($1, $2) 
            RETURNING *;
            `, [userId, isPurchased]
        );
        return carts;
    } catch (error) {
      console.error("Failed to create cart!");
      throw error;
    }
}

//do we need this? (guest cart is stored in local storage)
// async function createGuestCart({ session_id, order_status }){
//   try {
//     const { rows: [ cart ]} = await client.query(`
//       INSERT INTO cart_orders(session_id, order_status)
//       VALUES ($1, $2)
//       RETURNING *;
//     `, [ session_id, order_status ])

//     return cart;
//   } catch (error) {
//     console.log("Error creating a guest cart");
//     throw error;
//   }
// }



//getCartById by cartId to access a particular users cart 
//used in API: cartsRouter.patch('/:cartId', to update cart
//and used in API: cartsRouter.delete('/:cartId', to delete cart
async function getCartById(id) {
    try {
      const { rows: [cart] } = await client.query(`
        SELECT * FROM carts
        WHERE id = $1;
      `,
       [id]
      );

      //attachCProductsToCart
      cart.products = await attachProductsToCarts(id)
      return cart;
    } catch (error) {
      throw error;
    }
  }

//getCartWithoutProducts | like getRoutinesWithoutActivities()
async function getCartsWithoutProducts() {
    try {
      const { rows } = await client.query(`
        SELECT * FROM carts
        `);
      return rows;
    }
    catch (error) {
      throw error;
    }
  }

//getAllPurchasedCarts by cartId to get all already purchased carts by user (aka past orders) | similar to getPublicRoutinesByUser({ username }) variation

//do we need a function here to updateIsPurchased on a cart, if not where does that happen?

//what other cart functions do we need? 

module.exports = {
    createUserCart,
    // createGuestCart,
    getCartById,
    getCartsWithoutProducts
};