import React, { useEffect, useState } from 'react';
import { fetchAllProducts } from "./api";
import './index.css';
import { BrowserRouter as Router,Routes, Route } from 'react-router-dom';
import Home from './pages/Home/Home.jsx';
import Register from './pages/Register/Register.jsx';
import Navbar from './components/Navbar/Navbar.jsx';
import About from './pages/About/About.jsx';
import Login from './pages/Login/Login.jsx';
import Hero from "./components/Hero/Hero.jsx";
import Footer from "./components/Footer/Footer.jsx";
import Products from './pages/Product/Products.jsx';
import ProductById from './pages/Product/ProductById.jsx';
import Cart from './pages/Cart/Cart.jsx';
import Searchbar from './components/Searchbar';

function App() {
  const [token, setToken] = useState("");
  const [email, setEmail] = useState('');
  const [productsList, setProductsList] = useState([{}]);
  const [cartId, setCartId] = useState();
  const {searchResults, setSearchResults} = useState([]);

  useEffect(() => {
    fetchAllProducts().then((results, json) => {
      setProductsList(results, json)
      setSearchResults(json)
      return json
    }).catch(console.error)
    
    const myToken = localStorage.getItem("token")
    setToken(myToken)
   }, [])

  
   return (
    
    <Router>
      <Navbar cartId={cartId}/>
      <Hero />
      <Searchbar searchResults={searchResults} />
      <Routes>
         <Route path='/' element={<Home />}></Route>
         
         <Route path='/products' element={
           <Products
             productsList={productsList} 
           />
         }></Route>
         
         <Route path='/products/:productId' element={
           <ProductById
             productsList={productsList}
             token={token}
             cartId={cartId}
           />
         }></Route>
         
         <Route path='/about' element={<About />}></Route>
         
         <Route path='/login' element={
           <Login token={token}
             setToken={setToken} 
             email={email}
             setEmail={setEmail}
             setCartId={setCartId}
             cartId={cartId}
           />
         }></Route>
         
         <Route path='/register' element={
           <Register
             token={token}
             setToken={setToken} 
             email={email}
             setEmail={setEmail}
           />
         }></Route>
         
         <Route path='/carts/:cartId' element={
           <Cart
             token={token}
             cartId={cartId}
           />
         }></Route>
      </Routes>
      <Footer />
    </Router>
   
  );
}

export default App;