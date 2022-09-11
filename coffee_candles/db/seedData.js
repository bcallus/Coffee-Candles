//importdb functions
const {
  createUser,
  createProduct
   } = require('./');
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
        //check if category is correct
        //check on orders table
        //handle origional price of orders(products)
      await client.query(`
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            price NUMERIC(4, 2),
            stock INTEGER,
            category VARCHAR(255) NOT NULL
        );
        CREATE TABLE users (
            id SERIAL PRIMARY KEY,
            email VARCHAR(255) UNIQUE NOT NULL,
            password VARCHAR(255) NOT NULL
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
async function createInitialUsers() {
  console.log("Starting to create users...")
  try {
    const usersToCreate = [
      { email: "coffeelover@aol.com", password: "cafelatte" },
      { email: "candlelady123@gmail.com", password: "shescrafty" },
      { email: "ibuystuff@yahoo.com", password: "takemymoney" },
    ]
    const users = await Promise.all(usersToCreate.map(createUser))

    console.log("Users created:")
    console.log(users)
    console.log("Finished creating users!")
  } catch (error) {
    console.error("Error creating users!")
    throw error
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...")

    const productsToCreate = [
      {
        name: "French Vanilla Candle",
        description: "warm vanilla scent",
        price: 25.00,
        stock: 100,
        category: "candle",
      },
      {
        name: "Hazlenut Candle",
        description: "delicious hazlenut scent",
        price: 25.00,
        stock: 100,
        category: "candle",
      },
      {
        name: "Pumpkin Spice Candle",
        description: "seasonal item", //can this be a category?
        price: 35.00,
        stock: 100,
        category: "candle",
      },
      {
        name: "Dark Roast Coffee",
        description: "bold and dark",
        price: 14.95,
        stock: 150,
        category: "coffee",
      },
      {
        name: "French Roast Coffee",
        description: "smooth medium roast",
        price: 14.95,
        stock: 150,
        category: "coffee", },
      {
        name: "Blond Roast Coffee",
        description: "light and bold",
        price: 14.95,
        stock: 150,
        category: "coffee",
      }
    ]
    const products = await Promise.all(productsToCreate.map(createProduct))

    console.log("products created:")
    console.log(products)

    console.log("Finished creating products!")
  } catch (error) {
    console.error("Error creating products!")
    throw error
  }
}


async function rebuildDB() {
    try {
      await dropTables()
      await createTables()
      //await createInitial functions here if used
      await createInitialUsers()
      await createInitialProducts()
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