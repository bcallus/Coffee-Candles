import React from 'react';
import './home.css'
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
    
  const handleClick = () => {
      navigate(`/products/`);
  }

  return (
  <div className='home'>
    <div className='container'>
      Welcome! Our belief here is acquiring the most high quality coffee beans and tea leaves resourced from all over the world ethically and mindfully, this is coffee for every body!
      <div className='btns'>
        <button className='coffeebtn'onClick={handleClick}>SHOP OUR PRODUCTS</button>
      </div>
    </div>
  </div>

  );
};

export default Home;
