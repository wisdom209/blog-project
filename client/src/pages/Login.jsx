import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import '../App.css';
import axios from 'axios';
import { MyContext } from './context';
import { Navigate } from 'react-router-dom';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);
  const { baseUrl } = useContext(MyContext);

  const submitHandler = (e) => {
    e.preventDefault();
    axios
      .post(`${baseUrl}/login`, { username, password })
      .then((response) => {
        alert('Login Successful');
        Cookies.set('token', response.data.token);
        Cookies.set('username', response.data.user.username);
        setLoggedIn(true);
      })
      .catch((error) => {
        alert('Login failed');
      });
  };

  return (
    <div>
      {loggedIn && <Navigate to="/" replace={true} />}
      <Header />
      <form className="auth-form" onSubmit={submitHandler}>
        <h2 style={{ marginTop: '50px' }}>LOGIN</h2>
        <input
          placeholder="Username"
          type="text"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          placeholder="Password"
          type="password"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Login;
