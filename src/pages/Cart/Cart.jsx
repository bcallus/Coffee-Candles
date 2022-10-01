import React, { useEffect } from "react";
import "./cart.css";
import { fetchUserCart } from "../../api";

const Cart = ({token, cartId, ordersList, setOrdersList}) => {
  //lifted ordersList state up, remove once you know it works
  // const [ordersList, setOrdersList] = useState([])

  useEffect(() => {
    fetchUserCart(token, cartId).then((results) => {
    setOrdersList(results);
    }).catch(console.error)
  }, [])
  
  console.log({ ordersList, line: 14 })
  
  const calcTotalPrice = () => {
    const productsList = ordersList.products
    
    if (productsList) {
      let totalPrice = productsList.reduce(function (totalPrice, product) {
        return (Math.ceil((Number(totalPrice) + Number(product. price))*100)/100).toFixed(2);
      }, 0);
    return totalPrice
   }
}
  
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
      <div className="checkout-section">
      <p className="title-total">Total: ${calcTotalPrice()}</p>
      
      <button className="checkout-button">checkout order</button>
      </div>
    </div>
  
)

};

export default Cart;