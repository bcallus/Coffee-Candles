import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Navbar from './components/Navbar';

function App() {
  const [token, setToken] = useState('');

  useEffect(() => {
    const myToken = localStorage.getItem('token');
    setToken(myToken);
  }, []);
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/home' exact elements={<Home />} />
        {/* <Route path='/products' exact elements={<Products/>}/> */}
        {/* <Route path='/about' exact elements={<About/>}/> */}
        {/* <Route path='/login' exact elements={<Login/>}/> */}
        <Route path='/sign-up' exact elements={<SignUp />} />
      </Routes>
    </Router>
  );
}

export default App;
