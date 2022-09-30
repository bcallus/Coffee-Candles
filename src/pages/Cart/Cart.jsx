import React, { useState, useEffect } from "react";
import "./cart.css";
import { fetchUserCart } from "../../api";

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
      <p className="title-price">Price</p>
          <div>
        {ordersList.products ? ordersList.products.map((product) => (
          <div className="order-container">
              <div className="order">
                <img className="thumbnail" 
                  src={product.image_url} 
                  alt={product.name}/>
                  <p className="item-info">{product.name}</p>
                  <p className="item-info">Qty: {product.quantity}</p>
                  {/* <p className="item-info-price">${product.price}</p> */}
            </div>
            <div className="edit-delete-order-buttons">
                  <button className="delete-order-button">delete item</button>
                  <button className="delete-order-button">add another to cart</button>
                  <p className="item-info-price">${product.price}</p>
                </div>
            </div>
            )) : <p className="cart-empty">Your shopping cart is empty.</p>}
          </div>
    </div>
  
)

};

export default Cart;