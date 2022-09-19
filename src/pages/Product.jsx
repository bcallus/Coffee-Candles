import React from "react";

const Product = ({product}) => {

    return (
        <div>
            <p><b>Product #{product.id}</b></p>
            <p>Name: {product.name}</p>
            <p>Description: {product.descripton}</p>
            <p>Price: {product.price}</p>
        </div>
    )
}

export default Product;