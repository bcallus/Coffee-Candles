import React, { useState } from 'react';
import './navbar.css';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from 'react-icons/ai';

import { GiCoffeeBeans } from 'react-icons/gi'

const Navbar = () => {
    const [click, setClick] = useState(false)
    const handleClick = () => { setClick(!click) }


  return (
    <div className='navbar'>
      <div className="container">
        <h1><span><GiCoffeeBeans /> Coffee </span>+ Tea</h1>
        <ul className={click ? 'nav-menu active' : 'nav-menu'} >
            <li><a href='/'>Home</a></li>
            <li><a href='/products'>Products</a></li>
            <li><a href='/about'>About</a></li>
            <li><a href='/cart'><AiOutlineShoppingCart /></a></li>
            <li><a href='/login'><AiOutlineUser /></a></li>
        </ul>
        <div className="ham" onClick={handleClick}>
          {click ? (<AiOutlineClose className='icon' />) : (<AiOutlineMenu className='icon' />)} 

        </div>      
      </div>
    </div>
  );
};

export default Navbar;
