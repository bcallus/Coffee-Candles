//importdb functions
const {
  createUser,
  createProduct,
  createOrder,
  createCategory,
  createCart
   } = require('./');
const client = require("./client")
  
async function dropTables() {
    try {
      console.log("Starting to drop all tables...");
        
      await client.query(`
        DROP TABLE IF EXISTS orders;
        DROP TABLE IF EXISTS carts;
        DROP TABLE IF EXISTS products;
        DROP TABLE IF EXISTS categories;
        DROP TABLE IF EXISTS users;
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
  
        //check on orders table
        //handle original price of orders(products)
        //use INTEGER for price if it causes issues
        //orders table needs to have cartstId reference
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" BOOLEAN NOT NULL DEFAULT false
        );
        CREATE TABLE categories (
          id SERIAL PRIMARY KEY,
          name VARCHAR(255) UNIQUE NOT NULL
        );
        CREATE TABLE products (
            id SERIAL PRIMARY KEY,
            name VARCHAR(255) UNIQUE NOT NULL,
            description TEXT NOT NULL,
            price NUMERIC(4, 2) NOT NULL,
            "inStock" BOOLEAN DEFAULT true,
            "categoryId" INTEGER REFERENCES categories(id),
            image_url TEXT
        );
        CREATE TABLE carts (
          id SERIAL PRIMARY KEY,
          "userId" INTEGER REFERENCES users(id),
          "isPurchased" BOOLEAN DEFAULT FALSE
        );
        CREATE TABLE orders (
            id SERIAL PRIMARY KEY,
            "productId" INTEGER REFERENCES products(id),
            "cartsId" INTEGER REFERENCES carts(id),
            quantity INTEGER,
            authenticated BOOLEAN DEFAULT false,
            price NUMERIC(4, 2)
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
      {
        email: "coffeelover@aol.com",
        password: "cafelatte",
        isAdmin: false
      },
      {
        email: "candlelady123@gmail.com",
        password: "shescrafty",
        isAdmin: false
      },
      {
        email: "ibuystuff@yahoo.com",
        password: "takemymoney",
        isAdmin: false
      },
      {
        email: "myemail@gmail.com",
        password: "mypassword",
        isAdmin: true
      },
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

async function createInitialCategories() {
  console.log("Starting to create categories...")
  try {
    const categoriesToCreate = [
      { name: "coffee" },
      { name: "tea" },
      { name: "seasonal"},
    ]
    const category = await Promise.all(categoriesToCreate.map(createCategory))

    console.log("Category created:")
    console.log(category)
    console.log("Finished creating categories!")
  } catch (error) {
    console.error("Error creating categories!")
    throw error
  }
}

async function createInitialProducts() {
  try {
    console.log("Starting to create products...")

    const productsToCreate = [
      {
        name: "Breakfast Blend Tea",
        description: "morning time tea",
        price: 25.00,
        inStock: true,
        categoryId: 2,
        image_url: "https://ibb.co/Lzc9VLQ"
      },
      {
        name: "Lemon Ginger Tea",
        description: "lemon and ginger paired together",
        price: 25.00,
        inStock: true,
        categoryId: 2,
        image_url: "https://ibb.co/VVRng2S"
      },
      {
        name: "Chai Tea",
        description: "seasonal item", //can this be a category?
        price: 35.00,
        inStock: false,
        categoryId: 3,
        image_url: "https://ibb.co/QNj167S"
      },
      {
        name: "Dark Roast Coffee",
        description: "bold and dark",
        price: 14.95,
        inStock: true,
        categoryId: 1,
        image_url: "https://ibb.co/0Gx77W1"
      },
      {
        name: "French Roast Coffee",
        description: "smooth medium roast",
        price: 14.95,
        inStock: false,
        categoryId: 1,
        image_url: "https://ibb.co/y4xFJ3r"
      },
      {
        name: "Blond Roast Coffee",
        description: "light and bold",
        price: 14.95,
        inStock: true,
        categoryId: 1,
        image_url: "https://ibb.co/KhvWN7J"
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

async function createInitalCarts() {
  try {
    console.log("Starting to create carts!")
    const cartToCreate = [
      {
        userId: 3,
        isPurchased: true,
      },
      {
        userId: 1,
        isPurchased: false,
      },
      {
        userId: 2,
        isPurchased: false,
      },
      {
        userId: 4,
        isPurchased: true,
      }
    ]

    const cart = await Promise.all(cartToCreate.map(createCart))

    console.log("Cart created:")
    console.log(cart)

    console.log("Finished creating carts!")
  }
  catch (error) {
    console.error("Error creating carts!")
    throw error
  }
}

async function createInitialOrders() {
  try {
    console.log("Starting to create orders...")

    const ordersToCreate = [
      {
        productId: 2,
        cartsId: 2,
        quantity: 1,
        authenticated: false,
        price: 25.00
      },
      {
        productId: 5,
        cartsId: 4,
        quantity: 2,
        authenticated: true,
        price: 14.95
      },
      {
        productId: 1,
        cartsId: 1,
        quantity: 1,
        authenticated: true,
        price: 25.00
      },
      {
        productId: 4,
        cartsId: 3,
        quantity: 3,
        authenticated: false,
        price: 14.95
      }
    ]
    const orders = await Promise.all(ordersToCreate.map(createOrder))

    console.log("orders created:")
    console.log(orders)

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
      await createInitialCategories()
      await createInitialProducts()
      await createInitalCarts()
      await createInitialOrders()
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