import React from "react";

const Cart = ({ cartItems, onAdd, onRemove }) => {


  return (
    <div>
      <h2>Shopping Cart</h2>
      <div>
        {cartItems.length === 0 && <div>Cart Is Empty</div>}
      </div>
      {cartItems.map(item => (
        <div key={item.id}>
          <div>{item.name}</div>
          <div>
            <button onClick={() => onAdd(item)}>+</button>
            <button onClick={() => onRemove(item)}>-</button>
          </div>
          <div>
            {item.qty} x ${item.price.toFixed(2)}
          </div>
       
        </div>
      ))}
    </div>
    
    )
}

export default Cart;