import React from "react";
import "./guestCart.css"

const GuestCart = ({ guestCart, productsList }) => {

    const calcTotalPrice = () => {
        if (guestCart) {
          let totalPrice = guestCart.reduce(function (totalPrice, product) {
            return (Math.ceil((Number(totalPrice) + Number(product.price))*100)/100).toFixed(2);
          }, 0);
        return totalPrice
       }
    }
  
  const editGuestCart = (event) => {
    console.log({ guestCart, line: 15 })
    const filteredProduct = guestCart.filter((product) => product.index)
    console.log({ filteredProduct, line: 17 })
    console.log({event, line:17})
      
  }
  
  // const deleteGuestCart = (event) => {

  // }
  
    
    return (
        <div>
          <h1 className="title">Shopping Cart</h1>
          {guestCart.length ? <p className="title-price">Price</p> : null}
              <div>
            {guestCart.length ? guestCart.map((product, index) => (
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
                      <button className="edit-order-button" onClick={editGuestCart}>add another to cart</button>
                      <p className="item-info-price">${product.price}</p>
                    </div>
                </div>
                )) : <p className="cart-empty">Your shopping cart is empty.</p>}
          </div>
          <div className="checkout-section">
          {guestCart.length ? <p className="title-total">Total: ${calcTotalPrice()}</p> : null}
          
          {guestCart.length ? <button className="checkout-button">checkout order</button> : null}
          </div>
        </div>
      
    )
}

export default GuestCart;