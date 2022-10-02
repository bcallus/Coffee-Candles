import React from "react";

const GuestCart = ({ guestCart }) => {

    const calcTotalPrice = () => {
        if (guestCart) {
          let totalPrice = guestCart.reduce(function (totalPrice, product) {
            return (Math.ceil((Number(totalPrice) + Number(product.price))*100)/100).toFixed(2);
          }, 0);
        return totalPrice
       }
    }
    
    return (
        <div>
          <h1 className="title">Shopping Cart</h1>
          <p className="title-price">Price</p>
              <div>
            {guestCart ? guestCart.map((product, index) => (
              <div className="order-container" key={index}>
                  <div className="order">
                    <img className="thumbnail" 
                      src={product.image_url} 
                      alt={product.name}/>
                      <p className="item-info">{product.name}</p>
                      <p className="item-info">Qty: 1</p>
                </div>
                <div className="edit-delete-order-buttons">
                      <button className="delete-order-button">delete item</button>
                      <button className="delete-order-button">add another to cart</button>
                      <p className="item-info-price">${product.price}</p>
                    </div>
                </div>
                )) : <p className="cart-empty">Your shopping cart is empty.</p>}
          </div>
          <div className="checkout-section">
          <p className="title-total">Total: ${calcTotalPrice()}</p>
          
          <button className="checkout-button">checkout order</button>
          </div>
        </div>
      
    )
}

export default GuestCart;