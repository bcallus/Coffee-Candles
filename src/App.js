import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import About from './pages/About';



function App() {
  const [token, setToken] = useState("");
  

   useEffect(()=>{
    const myToken = localStorage.getItem("token")
    setToken(myToken)
  },[])
  return (
    <Router>
      <Navbar />
      <Routes>
      <Route path='/' exact element={<Home/>}/>
        {/* <Route path='/products' exact element={<Products/>}/> */}
        <Route path='/about' exact element={<About/>}/>
        {/* <Route path='/login' exact element={<Login/>}/> */}
        <Route path='/register' exact element={<Register/>}/>
      </Routes>
    </Router>
  );
}

export default App;
