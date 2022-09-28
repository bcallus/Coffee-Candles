import React from 'react'
import {  AiOutlineFacebook } from 'react-icons/ai'
import { IoLogoInstagram, IoLogoSnapchat } from 'react-icons/io'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="social">
        <p>Connect with us!</p>
        <a href='http://snapchat.com/coffee_tea'>
        <IoLogoSnapchat className='icon' /></a>
        <a href='http://facebook.com/coffee_tea'>
        <AiOutlineFacebook className='icon' /></a>
        <a href='http://instagram.com/coffee_tea'>
        <IoLogoInstagram className='icon' /></a>
        <p>© 2022 Coffee + Candles LLC</p>
      </div>     
    </div>
  )
}

export default Footer