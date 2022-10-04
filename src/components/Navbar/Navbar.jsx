import React, { useState } from 'react';
import { Link } from "react-router-dom";
import './navbar.css';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

import { GiCoffeeBeans } from 'react-icons/gi'

const Navbar = ({cartId, isLoggedIn}) => {
    const [click, setClick] = useState(false)
    const handleClick = () => { setClick(!click) }
    // const hideNavbar =()=>{
    //   navRef.current.classList.remove("responsive_nav")
    // }

  return (
    <div className='navbar'>
      <div className="container">
        <h1><span><GiCoffeeBeans /> Coffee </span>+ Tea</h1>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
            <li><Link to="/">Home</Link></li>
            <li><Link to="/products">Products</Link></li>
            <li><Link to="/about">About</Link></li>
          
            {isLoggedIn ? <li>
            <Link to={`/carts/${cartId}`}>
              <AiOutlineShoppingCart />
            </Link>
            </li>
            : <li>
              <Link to="/carts/guest">
                <AiOutlineShoppingCart />
              </Link>
            </li>}
          
          <li><Link to="/login"><AiOutlineUser /></Link></li>
    
          {isLoggedIn ? <li><Link to="/logout">Log Out</Link></li> : null}
        </ul>
        <div className="ham" onClick={handleClick}>
          {click ? (<AiOutlineClose className='icon' />) : (<AiOutlineMenu className='icon' />)} 

        </div>      
      </div>
    </div>
  );
};

export default Navbar;
