import React, { useEffect, useState } from 'react';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Register from './pages/Register';
import Navbar from './components/Navbar';
import Login from './pages/Login';
// import Sidebar from './components/Sidebar';


function App() {
  const [token, setToken] = useState("");
  

   useEffect(()=>{
    const myToken = localStorage.getItem("token")
    setToken(myToken)
  },[])
  return (
    
    <Router>
      {/* <Sidebar /> */}
      <Navbar />
      <Routes>
      <Route path='/' element={<Home />}></Route>
        {/* <Route path='/products' exact element={<Products/>}/> */}
        {/* <Route path='/about' exact element={<About/>}/> */}
        <Route path='/login' element={<Login />}></Route>
        <Route path='/register' element={<Register setToken={setToken}/>}></Route>
      </Routes>
    </Router>
   
  );
}

export default App;