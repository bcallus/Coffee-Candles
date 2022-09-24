import React from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";

const Product = ({ product }) => {
    const navigate = useNavigate();
    
    const handleClick = () => {
        console.log("CLICK")
        navigate(`/products/${product.id}`);

    }

    return (
        <div className="product-text">
            <div className="product-text">
            <p><b>{product.name}</b></p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            {product.inStock ? null : <p>Sold Out</p>}
            <img className="img" 
                src={product.image_url} 
                alt={product.name}/>
            <br />
            <button className="btn" 
                onClick={handleClick}>View Product</button>
            </div>
        </div>
    )
}

export default Product;

//fix product.image_url render
//change the candle images to tea images in db