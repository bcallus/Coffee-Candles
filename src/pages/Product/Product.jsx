import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";

const Product = ({ product }) => {
    const navigate = useNavigate();
    const [canEdit, setCanEdit] = useState(false);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditSubmit = (e) => {
        e.preventDefault()
        console.log("im clicked but not refreshing the page")
    }

    const handButtonClick = (e) => {

    }
    
    const handleClick = () => {
        navigate(`/products/${product.id}`);
//need an addToCart function and button

    }
    useEffect(() =>{
        const admin = localStorage.getItem('admin');
        console.log({admin, line:16});
        setCanEdit(admin);
    }, [])
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
                {canEdit && <button className="btn" onClick={handleEditSubmit}>Edit</button>}
                {isEditing && (
                    <form>
                        <input type="text" name="name" />
                        <input type="text" name="description" />
                        <input type="text" name="price" />
                        <input type="text" name="inStock" />
                        <input type="text" name="imageUrl" />
                        
                    </form>
                )}

            </div>
        </div>
    )
}

export default Product;

//fix product.image_url render
//change the candle images to tea images in db