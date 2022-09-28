import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { createNewCart } from '../../api';
import "./login.css"

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
      return result;
    })
    .catch(console.error);
}
export default function Login({ setToken, token, cartId }) {
  const [email, setEmail] = useState('');
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
    if (!token){
      setLoginError(data.message);
      return
    }
    navigate('/', { replace: true });
  };

  useEffect(() => {
    if (token) {
      const newCart = createNewCart({ token, cartId })
      console.log({newCart, line:54})
    }
  })

  return (
    <div className='login'>
      <form onSubmit={handleSubmit}>
        <h2> Log in</h2>
        <label>

          <p>Email</p>
          <input type='text' onChange={(e) => setEmail(e.target.value)} />

        </label>
        <div>
          <label>
            <p>Password</p>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {loginError && <p>{loginError}</p>}

        <div>
          <button type='login'>Log In</button>
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