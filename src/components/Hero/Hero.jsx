import React from 'react'
import './hero.css'
import { AiOutlineSearch } from 'react-icons/ai'

const Hero = () => {
  return (
    <div className='hero'>
      <div className="content">
        <h1>Find your perfect taste. Coffee For Every Body.</h1>
        {/* <p className='search-text'> Search our selection of hand grown and ethically sourced coffee beans and tea leaves.</p>
        <form className='search'>
          <div>
            <input type="text"
            placeholder='Enter description' />
          </div>
          <div className='radio'> 
                        <input type='radio' checked />
                        <label>Coffee</label>
                        <input type='radio'  />
                        <label>Tea</label>
          <button type="submit"><AiOutlineSearch className="icon" /></button>
          </div>
        </form> */}
      </div>
    </div>
  )
}

export default Hero