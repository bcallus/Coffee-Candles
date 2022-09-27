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
                    <button className="add-to-cart" onClick={handleClick}>add to cart</button>  
                  
            </div>
          ))}
        </div>
            <button className="back-to-products" onClick={allProduct}>back to products</button>
        </div>
  );
};

export default ProductById;
