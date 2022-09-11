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
    <div className='w-screen h-[80px] z-10 bg-zinc-200 fixed drop-shadow-lg'>
      <div className='px-2 flex justify-between items-center w-full h-full bg-[#2E4030]'>
        <div className='md:hidden' onClick={handleClick}>
          {!nav ? (
            <Bars3Icon className='w-5 text-white' />
          ) : (
            <XMarkIcon className='w-5 text-white' />
          )}
        </div>
        <div className='flex items-center'>
          <h1 className='text-2xl  ml-10 sm:text-4xl text-zinc-100'>
            BBCK's Cafe.
          </h1>
        </div>
        <div className='hidden md:flex'>
          <button className='border-none bg-transparent text-white mr-20'>
            Home
          </button>
          <button className='border-none bg-transparent text-white mr-20'>
            Products
          </button>
          <button className='border-none bg-transparent text-white mr-20'>
            About
          </button>
          <button className='border-none bg-transparent text-white mr-20'>
            Sign In
          </button>
          <button className='border-none bg-transparent text-white mr-20'>
            Sign Up
          </button>
          <ShoppingCartIcon className='w-7 mr-4 text-white' />
        </div>
      </div>

      <ul
        className={
          !nav ? 'hidden' : 'absolute bg-[#2E4030] w-full px-8 opacity-95'
        }
      >
        <li className='border-b-2 border-zinc-300 w-full text-white'>Home</li>
        <li className='border-b-2 border-zinc-300 w-full text-white'>
          Products
        </li>
        <li className='border-b-2 border-zinc-300 w-full text-white'>Cart</li>
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
