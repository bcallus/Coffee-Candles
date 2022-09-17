import React, { useState } from 'react';
import styles from './navbar.module.css';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineUser,
  AiOutlineShoppingCart,
} from 'react-icons/ai';
import Logo from '../../assets/CoffeeTeaLogoHome.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <>
      <header className={styles.logo}>
        <img src={Logo} alt='Logo' />
      </header>
      <nav className={styles.navbar}>
        <ul
          className={
            nav ? [styles.menu, styles.active].join('') : [styles.menu]
          }
        >
          <li>
            <a href='/'>HOME</a>
          </li>
          <li>
            <a href='/products'>PRODUCTS</a>
          </li>
          <li>
            <a href='/about'>ABOUT</a>
          </li>
          <li>
            <a href='/login'>SIGN IN</a>
          </li>
          <li>
            <AiOutlineSearch size={25} style={{ marginTop: '6px' }} />
          </li>
          <li>
            <AiOutlineUser size={25} style={{ marginTop: '6px' }} />
          </li>
          <li>
            <AiOutlineShoppingCart size={25} style={{ marginTop: '6px' }} />
          </li>
        </ul>
      </nav>
      <div onClick={() => setNav(!nav)} className={styles.mobile_btn}>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}
      </div>
    </>
  );
};

export default Navbar;
