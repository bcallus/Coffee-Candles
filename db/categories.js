const client = require("./client");

//
async function createCategory({ name }) {
    try {
      const { rows: [category] } = await client.query(`
      INSERT INTO categories (name)
      VALUES ($1)
      RETURNING *;
    `, [name]);
  
      return category;
    }
    catch (error) {
      throw error;
    }
  }

module.exports = {
	createCategory
};