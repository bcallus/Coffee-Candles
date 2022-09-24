import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

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
    <div
     style={{
      display: 'flex',
      justifyContent: 'center',
      height: '90vh',
      paddingTop: '15vh'
    }}
    >
       <form onSubmit={handleSubmit}>
        <h2> Please Register</h2>
        <div>
          <label>
            <p>Email</p>
            <input type='text' onChange={(e) => setEmail(e.target.value)} />
          </label>
        </div>
        <div>
          <label>
            <p>Password</p>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        <div>
          <label>
            <p>Confirm Password</p>
            <input
              type='password'
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
        </div>
        {registerError && <p>{registerError}</p>}
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
}