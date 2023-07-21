import React, { useState, useContext } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { MyContext } from './context';
import { Navigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistered, setiSRegistered] = useState(false);
  const { baseEndPoint } = useContext(MyContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(`${baseEndPoint}/register`, { username, password })
      .then((response) => {
        setiSRegistered(true);
        alert('Registeration successful');
      })
      .catch((error) => {
        alert('Registeration failed');
      });
  };

  return (
    <div>
      {isRegistered && <Navigate to="/login" replace={true} />}
      <Header />
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2 style={{ marginTop: '50px' }}>REGISTER</h2>
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

export default Register;
