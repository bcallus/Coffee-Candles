import React from "react";
import { useParams } from 'react-router-dom'
// import { createNewOrder } from "../../api";



const ProductById = ({productsList, onAdd, cartItems}) => {
    const {productId} = useParams();
    const id = parseInt(productId);
    // const [product, setProduct] = useState();

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
                        <button onClick={() => onAdd(product)}>add to cart</button>
                    </div> 
                ))
             }
               
            
        </div>
        
           
    )
    }

export default ProductById;