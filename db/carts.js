const client = require("./client");
//CARTS ARE SIMILAR TO ROUTINES ON FITNESS TRACKER

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
  
//getCartById by cartId to access a particular cart | like  getRoutineById(id)

//getCartWithoutOrders | like getRoutinesWithoutActivities() do we need this?

//getAllCartsByUser to get a users carts | like getAllRoutinesByUser({ username }) (OR break up into two, not yet purchased and already purchased?)

//getCurrentCartByUser to get a users cart | like getAllRoutinesByUser({ username }) but maybe set WHERE isPurchased = false

//getAllPurchasedCartsByUser to get all already purchased carts by user (aka past orders) | similar to getPublicRoutinesByUser({ username }) variation

//updateIsPurchased by cartId ? for once items in cart are officially purchased | like  updateRoutine({id, ...fields})

//what other cart functions do we need? ( getPublicRoutinesByActivity({id}) was there but i dont think we need that here)

module.exports = {
    createCart
};