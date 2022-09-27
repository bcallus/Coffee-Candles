//importdb functions
const {
  createUser,
  createProduct,
  createCategory,
  createCart,
  getCartsWithoutProducts,
  getAllProducts,
  addProductToCart
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
  
        //handle original price of orders(products)
        //use INTEGER for price if it causes issues
        //orders table IS THE SAME AS cart items
      await client.query(`
        CREATE TABLE users (
          id SERIAL PRIMARY KEY,
          email VARCHAR(255) UNIQUE NOT NULL,
          password VARCHAR(255) UNIQUE NOT NULL,
          "isAdmin" BOOLEAN DEFAULT false
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
            "cartId" INTEGER REFERENCES carts(id),
            quantity INTEGER,
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
        image_url: "https://as2.ftcdn.net/v2/jpg/02/15/89/13/1000_F_215891358_2v6RDd3xPVBs9eeaN5TvQx3FgMSZKn4C.jpg"
      },
      {
        name: "Lemon Ginger Tea",
        description: "An herbal infusion of fresh lemon and ginger.",
        price: 25.00,
        inStock: true,
        categoryId: 2,
        image_url: "https://as2.ftcdn.net/v2/jpg/02/82/51/35/1000_F_282513551_K28UNc2noPQmtcf7wU1gxw2ih8QYnR9y.jpg"
      },
      {
        name: "Chai Tea",
        description: "seasonal item", //can this be a category?
        price: 35.00,
        inStock: false,
        categoryId: 3,
        image_url: "https://as1.ftcdn.net/v2/jpg/02/38/23/40/1000_F_238234081_eg6v3rGDVl0wRKOJNO5A82umOsTcf2KA.jpg"
      },
      {
        name: "Dark Roast Coffee",
        description: "bold and dark",
        price: 14.95,
        inStock: true,
        categoryId: 1,
        image_url: "https://as2.ftcdn.net/v2/jpg/01/05/90/77/1000_F_105907729_4RzHYsHJ2UFt5koUI19fc6VzyFPEjeXe.jpg"
      },
      {
        name: "French Roast Coffee",
        description: "smooth medium roast",
        price: 14.95,
        inStock: false,
        categoryId: 1,
        image_url: "https://as1.ftcdn.net/v2/jpg/01/59/18/36/1000_F_159183621_0YTKAAqAA7GI7DlCBfYJ2wfKbC6Zf30V.jpg"
      },
      {
        name: "Blond Roast Coffee",
        description: "light and bold",
        price: 14.95,
        inStock: true,
        categoryId: 1,
        image_url: "https://as2.ftcdn.net/v2/jpg/01/09/48/95/1000_F_109489577_rW8Ti6XR00nSEHmH9PONlRqXN0cffO7N.jpg"
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
    const [cart1, cart2, cart3, cart4] =
    await getCartsWithoutProducts()
  const [candle1, candle2, candle3, coffee1, coffee2, coffee3] =
    await getAllProducts()

    const ordersToCreate = [
      {
        productId: candle1.id,
        cartId: cart2.id,
        quantity: 1,
        price: 25.00
      },
      {
        productId: coffee1.id,
        cartId: cart3.id,
        quantity: 2,
        price: 14.95
      },
      {
        productId: coffee3.id,
        cartId: cart4.id,
        quantity: 1,
        price: 25.00
      },
      {
        productId: candle2.id,
        cartId: cart1.id,
        quantity: 3,
        price: 14.95
      },
      {
        productId: candle1.id,
        cartId: cart4.id,
        quantity: 1,
        price: 25.00
      },
      {
        productId: coffee2.id,
        cartId: cart3.id,
        quantity: 2,
        price: 14.95
      },
      {
        productId: candle2.id,
        cartId: cart2.id,
        quantity: 1,
        price: 25.00
      },
      {
        productId: candle3.id,
        cartId: cart2.id,
        quantity: 3,
        price: 14.95
      },
      {
        productId: candle3.id,
        cartId: cart1.id,
        quantity: 3,
        price: 14.95
      }
    ]
    const orders = await Promise.all(ordersToCreate.map(addProductToCart))

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