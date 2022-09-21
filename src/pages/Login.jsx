import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

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
      console.log({result, line:19});
      return result;
    })
    .catch(console.error);
}
export default function Login({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = await loginUser({
      email,
      password,
    });
    console.log({data, line:35});
    const token = data.token;
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/', { replace: true });
  };

  return (
    <div 
    // style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   height: '90vh',
    //   paddingTop: '15vh'
    // }}
    >
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