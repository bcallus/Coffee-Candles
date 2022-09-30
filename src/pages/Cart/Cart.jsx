import React, { useState, useEffect } from "react";
import "./cart.css";
import { fetchUserCart } from "../../api";
import Order from "./Order";

const Cart = ({token, cartId}) => {
  const [ordersList, setOrdersList] = useState([])

  useEffect(() => {
    fetchUserCart(token, cartId).then((results) => {
    setOrdersList(results);
    }).catch(console.error)
  }, [])
  
  console.log({ordersList, line:14})
  
  
  return (
    <div>
      <h1 className="title">Shopping Cart</h1>
          <div>
        {ordersList.products ? ordersList.products.map((product) => (
              <div className="order-container">
                <img className="thumbnail" 
                  src={product.image_url} 
                  alt={product.name}/>
                <p>{product.name}</p>
                <p>{product.quantity}</p>
                <p>{product.price}</p>
              </div>
            )) : <p className="cart-empty">Your shopping cart is empty.</p>}
          </div>
    </div>
  
)

};

export default Cart;