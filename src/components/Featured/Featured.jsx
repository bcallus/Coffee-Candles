import React from 'react'
import './featured.css'
import feat1 from '../../assets/butterflypeatea.jpg'
import feat2 from '../../assets/goldenlatte.jpg'
import feat3 from '../../assets/matchatealatte2.jpg'

const Featured = () => {
  return (
    <div className='featured'>
      <h1>Bestsellers</h1>
      <div className='container'>
        <img src={feat1} alt='butterfly pea tea' />
        <img src={feat2} alt='golden chai latte' />
        <img src={feat3} alt='ceremonial matcha green tea' />
      </div>
    </div>
  )
}

export default Featured