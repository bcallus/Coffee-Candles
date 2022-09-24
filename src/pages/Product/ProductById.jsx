import React, {useEffect, useState} from "react";
import { useParams } from 'react-router-dom'



const ProductById = ({productsList}) => {
    const {productId} = useParams();
    const id = parseInt(productId);
    console.log({productId, line:8})
    // const [product, setProduct] = useState({});
    
         
    
    // useEffect(()=>{
    //     fetch(`/api/products/${id}`)
    //     .then(result => result.json())
    //     .then(data => {
    //         console.log({data, line:16})
    //         setProduct(data)
    //     })
    //     .catch(console.error);
        
    // }, [])
    
    const handleClick = () => {
        console.log("CLICK")

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