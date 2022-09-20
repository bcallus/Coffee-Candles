import React from "react";

const Product = ({product}) => {

    return (
        <div>
            <p><b>{product.name}</b></p>
            <p>Description: {product.description}</p>
            <p>Price: {product.price}</p>
            
            {product.inStock ? null : <p>Sold Out</p>}
        </div>
    )
}

export default Product;