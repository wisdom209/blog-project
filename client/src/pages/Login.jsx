import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { MyContext } from './context';
import { Navigate } from 'react-router-dom';
import Cookies from 'js-cookie'

function Login() {
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { baseEndPoint } = useContext(MyContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post(baseEndPoint + '/login', { username, password }).then(response => {
			setIsLoggedIn(true)
			Cookies.set('token', response.data.token)
		}).catch(error => {
			alert("Invalid credentials")
		})
	}

	return (
		<div>
			{isLoggedIn && <Navigate to='/' />}
			<Header />
			<h2 style={{ textAlign: 'center', marginTop: '50px' }}>Login</h2>
			<form className='auth-form' onSubmit={handleSubmit}>
				<input placeholder='username' type='text' onChange={(e) => setUsername(e.target.value)} />
				<input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Login
