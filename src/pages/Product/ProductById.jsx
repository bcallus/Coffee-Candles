import React from "react";
import { GiControlTower } from "react-icons/gi";
import { useParams } from 'react-router-dom'
// import { createNewOrder } from "../../api";



const ProductById = ({productsList}) => {
    const {productId} = useParams();
    const id = parseInt(productId);

    const handleAddToCart = () => {
        console.log("click")

    }

    return (
        <div>
             {
                productsList.length && productsList.filter(product => product.id === id).map(product => (
                    <div key={product.id}>
                        <p><b>{product.name}</b></p>
                        <p>Description: {product.description}</p>
                        <p>Price: {product.price}</p>
                        {product.inStock ? null : <p>Sold Out</p>}
                        <img src={product.image_url} alt={product.name}/>
                        <br />
                        <button onClick={handleAddToCart}>add to cart</button>
                    </div> 
                ))
             }
               
            
        </div>
        
           
    )
    }

export default ProductById;