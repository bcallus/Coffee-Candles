import React, { useState } from 'react';
import {
  Bars3Icon,
  XMarkIcon,
  ShoppingCartIcon,
} from '@heroicons/react/24/outline';

const Navbar = () => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);

  return (
    <div className='w-screen h-[70px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
      <div className='px-2 flex space-between items-center w-full h-full bg-gradient-to-l from bg-[#2E4030] imgShoppingCartIcon'>
        <div className='md:show' onClick={handleClick}>
          {!nav ? (
            <Bars3Icon className='w-5 text-white' />
          ) : (
            <XMarkIcon className='w-5 text-white' />
          )}
        </div>
        <div className='text-left'>
          <h1 className='text-3xl  ml-4 sm:text-4xl text-zinc-100'>
            BCKK's Cafe.
          </h1>
        </div>
      </div>

      <ul className={!nav ? 'hidden' : 'absolute bg-[#2E4030] w-full px-8'}>
        <li className='border-b-2 border-zinc-300 w-full text-white'>Home</li>
        <li className='border-b-2 border-zinc-300 w-full text-white'>
          Products
        </li>
        <li className='border-b-2 border-zinc-300 w-full text-white'>About</li>

        <div className='flex flex-col my-4'>
          <button className='px-8 py-3 mb-4'>Sign In</button>
          <button className='px-8 py-3'>Sign Up</button>
        </div>
      </ul>
    </div>
  );
};

export default Navbar;
