import React, { useState } from 'react';

const APIURL = `/api`;

export async function registerUser({ email, password }) {
	try {
		return fetch(`${APIURL}/users/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
		    email: email,
				password: password,
			}),
		})
			.then((response) => response.json())
      .then((result) => {
        console.log("result in registerUser--->", result)
				return result;
			});
	} catch (error) {
		console.error(error);
	}
}

export default function Register({ setToken }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
  
    console.log("email in register-->", email)
    console.log("password in register-->", password)
    const data = await registerUser({
      email,
      password,
    });
    const token = data.token;
    console.log('data in register', data);
    console.log('Token in Register', token);
    console.log('setToken in Register', setToken);
    localStorage.setItem('token', JSON.stringify(token));
    setToken(token);

  }

  return (
    <div
    //  style={{
    //   display: 'flex',
    //   justifyContent: 'center',
    //   height: '90vh',
    //   paddingTop: '15vh'
    // }}
    >
       <form onSubmit={handleSubmit}>
        <h2> Please Register</h2>
        <div>
          <label>
            <p>E-Mail</p>
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
        <div>
          <button type='submit'>Submit</button>
        </div>
      </form>
    </div>
  );
};