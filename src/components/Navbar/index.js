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
          <NavLink to='/' activestyle="true">
            HOME
          </NavLink>
          <NavLink to='/products' activestyle="true">
            PRODUCTS
          </NavLink>
          <NavLink to='/about' activestyle="true">
           ABOUT
          </NavLink>
          <NavLink to='/register' activestyle="true">
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