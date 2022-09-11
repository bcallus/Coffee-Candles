import React, { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';

import Home from './components/Home.jsx';


function App() {
  const [token, setToken] = useState("");
  

   useEffect(()=>{
    const myToken = localStorage.getItem("token")
    setToken(myToken)
  },[])
  return (
    <>
      <Navbar />

      <Home />

    </>
  );
}

export default App;
