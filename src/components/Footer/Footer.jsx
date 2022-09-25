import React from 'react'
import {  AiOutlineFacebook } from 'react-icons/ai'
import { IoLogoInstagram, IoLogoSnapchat } from 'react-icons/io'
import "./footer.css"

const Footer = () => {
  return (
    <div className='footer'>
      <div className="social">
        <p>Connect with us!</p>
        <IoLogoSnapchat className='icon' />
        <AiOutlineFacebook className='icon' />
        <IoLogoInstagram className='icon' />
      </div>     
    </div>
  )
}

export default Footer