import React from 'react'
import styles from "./hero.module.css"

const Hero = () => {
  return (
    <div className={styles.hero}>
      <form>
        <div className={styles.text}>
          <label>Search</label>
          <input type="text" placeholder='Search products' />
        </div>
        <div className={styles.search_btn}>
          {/* <button><Search></button> */}
        </div>
      </form>
    </div>
  )
}

export default Hero