import React from 'react';
import './productById.css';
import { useParams, useNavigate, Navigate } from 'react-router-dom';

const ProductById = ({ productsList }) => {
  const { productId } = useParams();
  const id = parseInt(productId);
  console.log({ productId, line: 8 });

  const Navigate = useNavigate();

  const allProduct = () => {
    Navigate('/products');
  };

  const handleClick = () => {
    console.log('CLICK');
  };

  return (
    <div className='product-container'>
      {productsList.length &&
        productsList
          .filter((product) => product.id === id)
          .map((product) => (
            <div key={product.id}>
              <p>
                <b>{product.name}</b>
              </p>
              <p>Description: {product.description}</p>
              <p>Price: {product.price}</p>
              {product.inStock ? null : <p>Sold Out</p>}
              <button onClick={allProduct}>back to product</button>
              <img src={product.image_url} alt={product.name} />
              <br />
              <button onClick={handleClick}>add to cart</button>
            </div>
          ))}
    </div>
  );
};

export default ProductById;
