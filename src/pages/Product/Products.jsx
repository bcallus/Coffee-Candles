import React, {useState, useEffect} from 'react';
import Product from './Product'
import "./product.css";
import Featured from '../../components/Featured/Featured'

const Products = ({ productsList, token, setProductList}) => {
    const [canAdd, setCanAdd] = useState(false)
    const [isAdding, setIsAdding] = useState(false);
    const [form, setForm] = useState({
        name: '',
        description: '',
        price: 0,
        inStock: true,
        imageUrl:''
    })


    useEffect(() =>{
        const admin = localStorage.getItem('admin');
        console.log({admin, line:16});
        setCanAdd(admin);
    }, [])

    const handleProductAdd = (e) =>{
        if(e.target.id === "inStock"){
            
            setForm({
                ...form, 
                [e.target.id]: e.target.checked
            })
        return 
    }
        setForm({
            ...form, 
            [e.target.id]: e.target.value
        })
    }

    const handleSubmit = (e) =>{
        e.preventDefault()
        console.log("submit")


    }

    const handleButtonClick =(e) =>{
        e.preventDefault()
        setIsAdding(!isAdding)
    }
    

    const updateProductList = (product, action) => {
     let list = productsList.slice()
        if (action === "edit"){
            list= productsList.map(prod => {
                if (prod.id === product.id){
                    return product
                }
                else {
                    return prod
                }
                
            })
        }
        else if (action === "delete"){
            list= productsList.filter(prod => {
                if (prod.id === product.id){
                    return false
                }
                else {
                    return true
                }
                
            })
        }

        else if (action === "add"){
            list.push(
                product
            )
        }
        setProductList(list)
    }
    return (
        <div>
            <Featured />
            {canAdd && <button className="btn"
            onClick={handleButtonClick}>Add A New Product</button>}
            {isAdding && (
                    <form className= "add" onSubmit={handleSubmit}>
                        <label>Name</label>
                        <input onChange={handleProductAdd} value={form.name} type="text" id="name" />
                        <label>Description</label>
                        <input onChange={handleProductAdd} value={form.description} type="text" id="description" />
                        <label>Price</label>
                        <input onChange={handleProductAdd} value={form.price} type="text" id="price" />
                        <label>InStock?</label>
                        <input onChange={handleProductAdd} ischecked={!form.inStock} type="checkbox" id="inStock" />
                        <label>ImageUrl</label>
                        <input onChange={handleProductAdd} value={form.imageUrl} type="text" id="imageUrl" />
                        <button className="btn">submit</button>
                        
                    </form> )} 
            <h1 className="products-page-title">All Products</h1>
            <div className='products-container'>
                {productsList.length && productsList.map(product => (
                    <Product updateProductList= {updateProductList}
                        key={product.id}
                        product={product}
                        token={token}
                        />

            ))}
            </div>
        </div>
    );
};

export default Products;