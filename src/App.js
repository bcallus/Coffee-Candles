import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from "./api";
import './App.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar.jsx';
import About from './pages/About/About';
import Login from './pages/Login';
import Hero from "./components/Hero/Hero.jsx";
//import data from './back/Data';
import Products from './pages/Products';
import ProductById from './pages/ProductById';


//const{productItems} = data;


function App() {
  const [token, setToken] = useState("");
  const [productsList, setProductsList] = useState([{}]);  

  useEffect(() => {
    fetchAllProducts().then((results) => {
      setProductsList(results);
    }).catch(console.error)
    
    const myToken = localStorage.getItem("token")
    setToken(myToken)
   }, [])
  
  return (
    
    <Router>
      <Navbar />
      <Hero />
      <Routes>
      <Route path='/' element={<Home />}></Route>
        <Route path='/products' element={<Products productsList={productsList} />}></Route>
        <Route path='/products/:productId' element={<ProductById productsList={productsList}/>}></Route>
        <Route path='/about' element={<About />}></Route>
        <Route path='/login' element={<Login token={token} setToken={setToken} />}></Route>
        <Route path='/register' element={<Register token={token} setToken={setToken}/>}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;