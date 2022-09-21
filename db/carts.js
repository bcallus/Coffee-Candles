const client = require("./client");

//default for isPurchased is false, has to be updated to change cart to purchsed cart?
async function createCart({ userId, isPurchased = false }) {
    try {
        const { rows: [carts] } = await client.query(`
            INSERT INTO carts("userId", "isPurchased")
            VALUES ($1, $2) 
            RETURNING *;
            `, [userId, isPurchased]
        );
        
        // console.log("CARTS from createcart-->", carts)
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