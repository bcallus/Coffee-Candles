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
  
      await client.query(`
        CREATE TABLE products (
          
        );
        CREATE TABLE users (
         
        );
        CREATE TABLE orders (
          
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