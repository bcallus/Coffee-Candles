import React from 'react'

const Cards = ({ product, handleClick }) => {
  const {title, price, description, img} = product;

  return (
    <div className="cards">
      <div className="image_url"></div>
      <div className="details">
        <p>{title}</p>
        <p>{description}</p>
        <p>Price: {price}</p>
        <button onClick={() => handleClick(product)}>Add To Cart</button>
      </div>
    </div>
  )
}

export default Cards