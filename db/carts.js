const client = require("./client");
const { createUser, getUserByEmail } = require("./users");
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
async function createGuestCart({ session_id, order_status }){
  try {
    const { rows: [ cart ]} = await client.query(`
      INSERT INTO cart_orders(session_id, order_status)
      VALUES ($1, $2)
      RETURNING *;
    `, [ session_id, order_status ])

    return cart;
  } catch (error) {
    console.log("Error creating a guest cart");
    throw error;
  }
}



//getCartById by cartId to access a particular cart | like  getRoutineById(id)
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
        
      console.log("rows from getCartsWithoutProducts-->", rows)
      return rows;
    }
    catch (error) {
      throw error;
    }
  }

//getCartByUser to get a users carts | like getAllRoutinesByUser({ username }) (OR break up into two, not yet purchased and already purchased?)
//need more joins, think of what you need to see in your cart carts/userId
async function getCartByUser(userId) {
    try {
  
        const { rows } = await client.query(`
        SELECT carts.id, carts."userId", carts."isPurchased", users.id, orders."productId", products.name, products.price, orders.quantity, products.image_url
        FROM carts
        JOIN orders ON orders."cartId" = carts.id
        JOIN products ON products.id = orders."productId"
        JOIN users ON carts."userId" = users.id
        WHERE users.id = $1
      `, [userId])
  
        const cartsByUserWithProducts = await attachProductsToCarts(rows)
        
        console.log("cartsByUserWithProducts from getCartByUser -->", cartsByUserWithProducts)
        return cartsByUserWithProducts;
  
    }
    catch (error) {
        throw error;
    }
}
//getCurrentCartByUser to get a users cart | like getAllRoutinesByUser({ username }) but maybe set WHERE isPurchased = false

//getAllPurchasedCartsByUser to get all already purchased carts by user (aka past orders) | similar to getPublicRoutinesByUser({ username }) variation

//do we need a function here to updateIsPurchased on a cart, if not where does that happen?

//what other cart functions do we need? ( getPublicRoutinesByActivity({id}) was there but i dont think we need that here)

module.exports = {
    createUserCart,
    createGuestCart,
    getCartById,
    getCartsWithoutProducts,
    getCartByUser
};