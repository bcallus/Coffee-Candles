import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./login.css"
import { createNewCart } from '../../api';

const APIURL = `/api`;

async function loginUser({ email, password }) {
  return fetch(APIURL + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        email: email,
        password: password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log({result, line:21})
      return result;
    })
    .catch(console.error);
}
export default function Login({ setToken, email, setEmail, setCartId, cartId, admin, setAdmin, setIsLoggedIn}) {
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setLoginError("Please fill out the form completely");
      return
    }
    const data = await loginUser({
      email,
      password,
    });
    const token = data.token;
    localStorage.setItem('token', token);
    setToken(token);
    if (data && data.user && data.user.isAdmin){
       const isAdmin = data.user.isAdmin
      localStorage.setItem('admin', isAdmin);
    setAdmin(isAdmin)
    }
    
    if (token) {
      const newCart = await createNewCart({ token, email })
      const newCartId = newCart.id
      setCartId(newCartId)
      setIsLoggedIn(true);
    }

    if (!token){
      setLoginError(data.message);
      return
    }
    navigate('/', { replace: true });
  };

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h2> Log in</h2>
        <label>
          <p>Email</p>
          <input 
          type='text' 
          placeholder='Your Email Here'
          onChange={(e) => setEmail(e.target.value)} />
        </label>
        <div>
          <label>
            <p>Password</p>
            <input
              type='password'
              placeholder='Your password here'
              onChange={(e) => setPassword(e.target.value)}/>
          </label>
        </div>
        {loginError && <p className="loginError" >{loginError}</p>}

        <div>
          <button className='loginbtn' type='login'>Log In</button>
          <div>
            <Link to='/register' style={{}}>
              Don't have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}