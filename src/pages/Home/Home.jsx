import React from 'react';
import styles from './home.module.css'

const Home = () => {
  return (
  <div className='home'>
    <div className='container'>
      Welcome! Our belief here is acquiring the most high quality coffee beans and tea leaves resourced from all over the world, this is coffee for every body!
      <button className={styles.button}>FIND YOUR TASTE</button>
    </div>
  </div>

  );
};

export default Home;
