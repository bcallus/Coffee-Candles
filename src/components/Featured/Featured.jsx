import React from 'react'
import './featured.css'
import feat1 from '../../assets/butterflypeatea.jpg'
import feat2 from '../../assets/goldenlatte.jpg'
import feat3 from '../../assets/matchatealatte2.jpg'

const Featured = () => {
  return (
    <div className='featured'>
      <h1>Bestsellers</h1>
      <div>
        <p><span className='bold'>All</span></p>
        <p>Coffees</p>
        <p>Teas</p>
      </div>
      <div className='container'>
        <img src={feat1} alt='' />
        <img src={feat2} alt='' />
        <img src={feat3} alt='' />
      </div>
    </div>
  )
}

export default Featured