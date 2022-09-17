import React, { useState } from 'react';
import styles from './navbar.module.css';
import {
  AiOutlineMenu,
  AiOutlineClose,
  AiOutlineSearch,
  AiOutlineUser,
} from 'react-icons/ai';
import Logo from '../../assets/CoffeeTeaLogoHome.png';

const Navbar = () => {
  const [nav, setNav] = useState(false);

  return (
    <header className={styles.navbar}>
      <img src={Logo} className={styles.logo} alt='Logo' />
      <nav>
        <ul className={nav ? [styles.menu, styles.active].join('') : [styles.menu]}>
          <li>
            <a href='/'>Home</a>
          </li>
          <li>
            <a href='/products'>Products</a>
          </li>
          <li>
            <a href='/about'>About</a>
          </li>
          <li>
            <AiOutlineUser size={25} style={{marginTop: '6px'}} />
          </li>
          <li>
            <AiOutlineSearch size={25} style={{marginTop: '6px'}} />
          </li>
        </ul>
      </nav>
      <div onClick={()=> setNav(!nav)} className={styles.mobile_btn}>
        {nav ? <AiOutlineClose size={25} /> : <AiOutlineMenu size={25} />}

      </div>
    </header>
  );
};

export default Navbar;
