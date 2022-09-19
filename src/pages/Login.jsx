import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const APIURL = `/api`;

async function loginUser({ username, password }) {
  try {
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
  }
  catch(error) {
    console.error(error)
  };
}
export default function Login({ setToken }) {
  const [username, setUserName] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("username-->", username)
    console.log("password-->", password)
    const data = await loginUser({
      username,
      password,
    });
    console.log("data in Login component-->", data);
    const token = data.data.token;
    console.log("token in Login component-->", token)
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

        <div 
        // className='relative top-5 left-5'
        >
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