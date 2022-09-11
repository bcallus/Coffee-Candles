import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Hero from './components/Hero.jsx';
import Login from './components/Login';

function App() {
  const [token, setToken] = useState("");
  

   useEffect(()=>{
    const myToken = localStorage.getItem("token")
    setToken(myToken)
  },[])
  return (
    <>
      <Navbar />
      <Routes>
      <Route path="/login" element={<Login setToken={setToken} />} />
      
      <Hero />
      
      </Routes>
    </>
  );
}

export default App;
