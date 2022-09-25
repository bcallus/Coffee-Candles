import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from "./api";
import './index.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register';
import Navbar from './components/Navbar/Navbar.jsx';
import About from './pages/About/About.jsx';
import Login from './pages/Login';
import Hero from "./components/Hero/Hero.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Products from './pages/Product/Products.jsx';
import ProductById from './pages/Product/ProductById.jsx';
import Cart from './components/Cart/Cart.jsx';

function App() {
  const [token, setToken] = useState("");
  const [productsList, setProductsList] = useState([{}]);
  const [cart, setCart] = useState([{}]);

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
        <Route path='/cart' element={<Cart cart={cart} setCart={setCart} />}></Route>
      </Routes>
      <Footer />
    </Router>
   
  );
}

export default App;