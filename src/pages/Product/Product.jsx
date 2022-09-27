import React from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";

const Product = ({ product }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        navigate(`/products/${product.id}`);
//need an addToCart function and button

    }

    return (
        <div className="product-item">
            <div className="product-text">
            <p className="products-name"><b>{product.name}</b></p>
            <p className="products-description">{product.description}</p>
            <p className="products-price">$ {product.price}</p>
            {product.inStock ? null : <p className="products-stock">Sold Out</p>}
            <img className="small" 
                src={product.image_url} 
                alt={product.name}/>
            <br />
            <button className="btn" 
                onClick={handleClick}>View Product</button>
            {/* <button className="btn" 
                onClick={handleClick}>Add to cart</button> */}
            </div>
        </div>
    )
}

export default Product;

//fix product.image_url render
//change the candle images to tea images in db