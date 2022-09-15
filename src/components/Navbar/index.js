import React from 'react';
import {
  Nav,
  NavLink,
  Bars,
  NavMenu,
  NavBtn,
  NavBtnLink
} from './NavbarElements';

const Navbar = () => {
  return (
    <>
    <h1 style={{
      display: 'flex',
      justifyContent: 'center',
    }}>Coffee "N" Tea</h1>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            Home
          </NavLink>
          <NavLink to='/products' activeStyle>
            Products
          </NavLink>
          <NavLink to='/about' activeStyle>
           About
          </NavLink>
          <NavLink to='/register' activeStyle>
            Sign Up
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login' >Sign In</NavBtnLink>
        </NavBtn>
      </Nav>
    </>
  );
};

export default Navbar;