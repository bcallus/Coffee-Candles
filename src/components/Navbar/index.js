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
      height: '10vh',
      margin: '10px'
    }}>Coffee + Tea</h1>
      <Nav>
        <Bars />
        <NavMenu>
          <NavLink to='/' activeStyle>
            HOME
          </NavLink>
          <NavLink to='/products' activeStyle>
            PRODUCTS
          </NavLink>
          <NavLink to='/about' activeStyle>
           ABOUT
          </NavLink>
          <NavLink to='/register' activeStyle>
            SIGN UP
          </NavLink>
        </NavMenu>
        <NavBtn>
          <NavBtnLink to='/login' >SIGN IN</NavBtnLink>
        </NavBtn>
      </Nav>
      <div style={{borderBottom: '1px solid'}}></div>
    </>
  );
};

export default Navbar;