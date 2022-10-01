import React from 'react';
import './productById.css';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../api';

const ProductById = ({ productsList, token, cartId}) => {
  const { productId } = useParams();
    const id = parseInt(productId);
    console.log({ cartId, line: 9 })

  const Navigate = useNavigate();

  const allProduct = () => {
    Navigate('/products');
  };

    const addToCart = async (event) => {
      event.preventDefault();
      const newOrder = await createNewOrder(token, cartId, productId)
      console.log({ newOrder, line: 23 })
        //this alert only alerts people that are logged in, we still have to build guest cart capability
      if (newOrder && cartId) {
        alert("This item has been added to your cart!")
    }
  };

    return (
    <div>
    <div className='product-container'>
      {productsList.length &&
        productsList
          .filter((product) => product.id === id)
          .map((product) => (
            <div key={product.id}>
                    <img className="product-image" src={product.image_url} alt={product.name} />
                    <p className="product-name">
                    <b>{product.name}</b>
                    </p>
                    <p className="product-price"><b>$ {product.price}</b></p>
              {product.inStock ? <p className="stock">In Stock</p> : <p className="stock">This item is SOLD OUT. Please check back later!</p>}
                    <p className="product-description">{product.description}</p>
              <br />
                    {product.inStock ? <button className="add-to-cart" onClick={addToCart}>add to cart</button> : null }
            </div>
          ))}
        </div>
            <button className="back-to-products" onClick={allProduct}>back to products</button>
        </div>
  );
};

export default ProductById;
