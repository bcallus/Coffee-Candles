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
  
//other cart related functions below

module.exports = {
	createCart
};