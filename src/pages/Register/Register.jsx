import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import "./register.css"

const APIURL = `/api`;

async function registerUser({ email, password }) {
  return fetch(APIURL + '/users/register', {
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
  

export default function Register({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if(!email || !password){
      setRegisterError("Please fill out the form completely");
      return
    }
    const data = await registerUser({
      email,
      password,
    });
    const token = data.token;
    console.log('data', data);
    console.log('Token in Register', token);
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);
    if (!token){
      setRegisterError(data.message);
      return
    }
    navigate('/', { replace: true });
  };

  return (
    <div className="register">
       <form onSubmit={handleSubmit}>
        <h2>Sign Up for an Account</h2>
        <div>
          <label>
            <p>Email</p>
            <input 
            type='text' 
            placeholder='Enter your email address'
            onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input
              type='password'
              placeholder='8 characters minimum'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <p>Confirm Password</p>
            <input
              type='password'
              placeholder='Confirm your password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {registerError && <p>{registerError}</p>}
        <div>
          <button className='regbtn' type='submit'>Submit</button>
        </div>
        <Link to='/login' style={{}}>
              Go back to sign in.
        </Link>
      </form>
    </div>
  );
}