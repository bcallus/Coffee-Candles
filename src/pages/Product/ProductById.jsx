import React from 'react';
import './productById.css';
import { useParams, useNavigate } from 'react-router-dom';
import { createNewOrder } from '../../api';

const ProductById = ({ productsList, token }) => {
  const { productId } = useParams();
  const id = parseInt(productId);
  console.log({ productId, line: 9 });

  const Navigate = useNavigate();

  const allProduct = () => {
    Navigate('/products');
  };

  const addToCart = async () => {
      console.log('CLICK');
      console.log({token, line:19});
      console.log({ productId, line: 20 });
      const newOrder = await createNewOrder(token, productId)
      console.log({newOrder, line:22})
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
                    {product.inStock ? <p className="stock">In Stock</p> : <p className="stock">Sold Out</p>}
                    <p className="product-description">{product.description}</p>
                    <br />
                    <button className="add-to-cart" onClick={addToCart}>add to cart</button>  
                  
            </div>
          ))}
        </div>
            <button className="back-to-products" onClick={allProduct}>back to products</button>
        </div>
  );
};

export default ProductById;
