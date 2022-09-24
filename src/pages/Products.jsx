import React from 'react';
import Product from './Product'

const Products = ({ productsList }) => {
    
    return (
        <div>
            <h1>All Products</h1>

            <div >
                {productsList.length && productsList.map(product => (
                    <Product
                        key={product.id}
                        product={product}
                    />
            ))}
            </div>
        </div>
    );
};

export default Products;