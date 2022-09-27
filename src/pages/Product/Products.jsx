import React from 'react';
import Product from './Product'
import "./product.css";
import Featured from '../../components/Featured/Featured'

const Products = ({ productsList }) => {
    
    return (
        <div>
            <Featured />
            <h1 className="products-page-title">All Products</h1>
            <div className='products-container'>
                {productsList.length && productsList.map(product => (
                    <Product
                        key={product.id}
                        product={product}/>
            ))}
            </div>
        </div>
    );
};

export default Products;