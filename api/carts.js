const express = require("express");
const cartsRouter = express.Router();
const { requireUser } = require("./utils")
const {
    updateOrder,
    destroyOrder,
    getCartsWithoutProducts,
    getCartByUser,
    getCartById,
    //add other functions here
} = require("../db");

//cartsRouter.get("/", to get all carts just for testing purposes so I can see what im doing here
cartsRouter.get("/", async (req, res, next) => {
    try {
      const carts = await getCartsWithoutProducts();
      console.log("carts from cartsRouter.get-->", carts)
      res.send(carts);
    } catch (error) {
      next(error);
    }
});

//cartsRouter.get("/:userId", to getCartById for specific userId /carts/:userId
cartsRouter.get("/:cartId", async (req, res, next) => {
  try {
    const { cartId } = req.params;
    const cartWithProducts = await getCartById(cartId)
    res.send(cartWithProducts);
  } catch (error) {
    next(error);
  }
});


//cartsRouter.patch('/:cartId', for a user to update their cart, uses getCartById
cartsRouter.patch('/:cartId', requireUser, async (req, res, next) => {
//this needs to be editited, half of this is still from fitness traxker

    // const updateObj = {};
    // const { cartId } = req.params;
    // const { productId, quantity, price } = req.body;
    // const { creatorId, name: originalName } = await getCartById(cartId);
    // try {
    //   updateObj.isPublic = isPublic;
    //   if (name) {
    //     updateObj.name = name;
    //   }
    //   if (goal) {
    //     updateObj.goal = goal;
    //   }
    //   if (await getCartById(cartId)) {
    //     updateObj.id = cartId;
    //   } else {
    //     res.status(404);
    //     next({
    //       name: 'CartNotFoundError',
    //       message: `Cart ${cartId} not found`,
    //       error: 'Error!',
    //     });
    //   }
    //   if (creatorId === req.user.id) {
    //     const response = await updateCart(updateObj);
    //     res.send(response);
    //   } else {
    //     res.status(403);
    //     next({
    //       error: 'Error!',
    //       name: 'NotCreatorOfCart',
    //       message: `User ${req.user.username} is not allowed to update ${originalName}`
    //     });
    //   }
    // } catch (error) {
    //   next(error);
    // }
  });

//cartsRouter.delete('/:cartId', for a user to delete their cart,  uses getCartById

//what other cartRouter requests do we need?

module.exports = cartsRouter;