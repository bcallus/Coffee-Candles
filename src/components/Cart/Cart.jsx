import React, { useState, useEffect } from "react";
import "../Cart/cart.css";
import product from "../../pages/Product/Product"

const Cart = ({ cart, setCart, handleChange }) => {
  const [price, setPrice] = useState(0);

  const handleRemove = (id) => {
    const arr = cart.filter((product) => product.id !== id);
    setCart(arr);
    handlePrice();
  };

  const handlePrice = () => {
    let ans = 0;
    cart.map((item) => (ans += product.amount * product.price));
    setPrice(ans);
  };

  useEffect(() => {
    handlePrice();
  });

  return (
    <article>
      {cart.map((item) => (
        <div className="cart_box" key={product.id}>
          <div className="cart_img">
            <img src={product.img} alt="" />
            <p>{product.title}</p>
          </div>
          <div>
            <button onClick={() => handleChange(item, 1)}>+</button>
            <button>{product.amount}</button>
            <button onClick={() => handleChange(item, -1)}>-</button>
          </div>
          <div>
            <span>{product.price}</span>
            <button onClick={() => handleRemove(product.id)}>Remove</button>
          </div>
        </div>
      ))}
      <div className="total">
        <span>Total</span>
        <span>Price: {price}</span>
      </div>
    </article>
  );
};

export default Cart;