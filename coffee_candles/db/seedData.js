// const {
//     //importdb functions
//    } = require('./');
const client = require("./client")
  
async function dropTables() {
    try {
      console.log("Starting to drop all tables...");
        
      await client.query(`
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS users;
        DROP TABLE IF EXISTS products;
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
            title VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            price NUMERIC(7, 2),
            inventory_quantity INTEGER
        );
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "ordersId" INTEGER REFERENCES products(id),
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