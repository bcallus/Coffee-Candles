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
  
  // console.log({ordersList, line:14})
  
  
  return (
    <div>
      <p>carts page</p>
    </div>
  
)

};

export default Cart;