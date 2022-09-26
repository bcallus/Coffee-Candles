import React, {useState} from "react";
import { useParams } from 'react-router-dom'



const ProductById = ({productsList, cart}) => {
    const {productId} = useParams();
    const id = parseInt(productId);
    const [product, setProduct] = useState();
    
    
    const handleClick = (product) => {
        console.log("CLICK")
        console.log({ productId, line: 14 })
        setProduct(product)
        console.log({product, line:16})
        

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
            <button onClick={handleClick}>add to cart</button>
                </div> 
                ))
             }
               
            
        </div>
        
           
    )
    }

export default ProductById;