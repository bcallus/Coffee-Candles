import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar.jsx';
import About from './pages/About/About';
import Login from './pages/Login';
import Hero from "./components/Hero/Hero.jsx";
//import data from './back/Data';
//import Products from './pages/Products';


//const{productItems} = data;


function App() {
  const [token, setToken] = useState("");
  

   useEffect(()=>{
    const myToken = localStorage.getItem("token")
    setToken(myToken)
  },[])
  return (
    
    <Router>
      <Navbar />
      <Hero />
      <Routes>
      <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products />}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register token={token} setToken={setToken}/>}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;