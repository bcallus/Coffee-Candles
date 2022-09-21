import React from 'react';
import Product from './Product'

const Products = ({ productsList }) => {
    
    return (
        <div>
            <h1>All Products</h1>

            <div >
                {productsList ? productsList.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
            ))
                : null}
            </div>
        </div>
    );
};

export default Products;