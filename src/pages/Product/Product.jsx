import React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./product.css";
import { editProduct } from "../../api";

const Product = ({ product, token, updateProductList}) => {
    console.log({inStock: product.inStock, line:8})
    const navigate = useNavigate();
    const [canEdit, setCanEdit] = useState(false);
    const [canDelete, setCanDelete] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    // const [inStock, setInStock] = useState(product.inStock ? "yes" : "no");
    const [form, setForm] = useState({
        name: product.name,
        description: product.description,
        price: product.price,
        inStock: product.inStock,
        imageUrl:product.image_url
    });
    
    const handleProductEdit = (e) =>{
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
   

    const handleEditSubmit = async (e) => {
        try {
            e.preventDefault()
            let formData = new FormData();
            formData.append("id", product.id)
        formData.append('name', form.name);
        formData.append('price', form.price);
        formData.append('description', form.description);
        formData.append('inStock', form.inStock);
        formData.append('imageUrl', form.imageUrl); 
        await editProduct(formData, token);
        setIsEditing(false)
        updateProductList({id: product.id, ...form, image_url: form.imageUrl}, "edit")


            
        } catch (error) {
            console.error(error);
            setIsEditing(false);
        
        }
     

    }

    const handleButtonClick = (e) => {
        e.preventDefault()
        setIsEditing(!isEditing)
        

    }

    const handleDelete = (productId) => {
        updateProductList(product, "delete")
    }

  
    
    const handleClick = () => {
        navigate(`/products/${product.id}`);
//need an addToCart function and button

    }
    useEffect(() =>{
        const admin = localStorage.getItem('admin');
        console.log({admin, line:16});
        setCanEdit(admin);
        setCanDelete(admin);
    }, [])
    return (
        <div className="product-item">
            <div className="product-text">
            <p className="products-name"><b>{product.name}</b></p>
            <p className="products-description">{product.description}</p>
            <p className="products-price">$ {product.price}</p>
            {product.inStock ? null : <p className="products-stock">Sold Out</p>}
            <img className="small" 
                src={product.image_url} 
                alt={product.name}/>
            <br />
            <button className="btn" 
                onClick={handleClick}>View Product</button>
                {canEdit && <button className="btn" onClick={handleButtonClick}>Edit</button>}
                {isEditing && (
                    <form onSubmit={handleEditSubmit}>
                        <label>Name</label>
                        <input onChange={handleProductEdit} value={form.name} type="text" id="name" />
                        <label>Description</label>
                        <input onChange={handleProductEdit} value={form.description} type="text" id="description" />
                        <label>Price</label>
                        <input onChange={handleProductEdit} value={form.price} type="text" id="price" />
                        <label>InStock?</label>
                        <input onChange={handleProductEdit} ischecked={!form.inStock} type="checkbox" id="inStock" />
                        <label>ImageUrl</label>
                        <input onChange={handleProductEdit} value={form.imageUrl} type="text" id="imageUrl" />

                        <button className="btn">submit</button>
                        
                    </form>      
                )}
                {canDelete && <button className="btn" onClick={handleDelete}>Remove</button> } 

                

            </div>
        </div>
    )
}

export default Product;

//fix product.image_url render
//change the candle images to tea images in db