const client = require("./client");

async function createCart({ userId, isPurchased }) {
    try {
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
  
//getCartById by cartId to access a particular cart

//getCartByUserId to get a users cart?

//updateIsPurchased by cartId ? for once items in cart are officially purchased

//what other cart functions do we need?

module.exports = {
	createCart
};