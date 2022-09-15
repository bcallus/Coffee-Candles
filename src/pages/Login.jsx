import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const APIURL = `http://localhost:3001/api`;

async function loginUser({ username, password }) {
  return fetch(APIURL + '/users/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
        username: username,
        password: password,
    }),
  })
    .then((response) => response.json())
    .then((result) => {
      console.log(result);
      return result;
    })
    .catch(console.error);
}
export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({
      username,
      password,
    });
    console.log(data);
    const token = data.data.token;
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/', { replace: true });
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      height: '90vh'
    }}>
      <form onSubmit={handleSubmit}>
        <h1> Log in</h1>
        <label>
          <p>Username</p>
          <input type='text' onChange={(e) => setUserName(e.target.value)} />
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

        <div className='relative top-5 left-5'>
          <button type='login'>Log In</button>
          <div>
            <Link to='/register' style={{}}>
              Dont have an account?
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
}