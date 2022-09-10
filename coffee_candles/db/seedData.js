// const {
//     //importdb functions
//    } = require('./');
const client = require("./client")
  
async function dropTables() {
    try {
        console.log("Starting to drop all tables...");
        
    // below: DROP TABLE IF EXISTS name-of-table;
      await client.query(`
        
      `);
  
      console.log("Finished dropping all tables!");
    }
    catch (error) {
      console.error("Error while dropping tables!");
      throw error;
    }
}
  
async function createTables() {
    try {
      console.log("Starting to create tables...");
  
        
        //products table: category and photo required?
        //reviews table optional
        //check on orders table
        //handle origional price of orders(products)
      await client.query(`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            title VARCHAR(255) UNIQUE NOT NUL,
            description TEXT NOT NULL,
            price NUMERIC(7, 2),
            inventory_quantity INTEGER
        );
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NUL
        );
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            product  VARCHAR(255) REFERENCES products(title),
            "productId" INTEGER REFERENCES products(id),
            price NUMERIC(7, 2) REFERENCES products(price)
            quantity INTEGER
        );
      `);
  
      console.log("Finished creating tables!");
    }
    catch (error) {
      console.error("Error while creating tables!");
      throw error;
    }
}
  
//look at fitness tracker back-end to see createInitial "test" functions that go here

async function rebuildDB() {
    try {
      await dropTables()
      await createTables()
      //await createInitial functions here if used
    } catch (error) {
      console.log("Error during rebuildDB")
      throw error
    }
  }
  
  module.exports = {
    rebuildDB,
    dropTables,
    createTables,
  }