import React from 'react';
import './home.css'

const Home = () => {
  return (
  <div className='home'>
    <div className='container'>
      Welcome! Our belief here is acquiring the most high quality coffee beans and tea leaves resourced from all over the world ethically and mindfully, this is coffee for every body!
      <div className='btns'>
        <button className='coffeebtn'>Coffee</button>
         - or -
        <button className='teabtn'>Tea</button>
      </div>
    </div>
  </div>

  );
};

export default Home;
