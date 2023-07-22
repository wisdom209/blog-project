import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import axios from 'axios';
import { MyContext } from './context';
import { Navigate } from 'react-router-dom';

function Login() {
	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const [isLoggedIn, setIsLoggedIn] = useState(false)
	const { baseEndPoint } = useContext(MyContext)

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post(baseEndPoint + '/login', { username, password }, {withCredentials: true}).then(response => {
			setIsLoggedIn(true)
		}).catch(error => {
			console.log(error)
		})
	}

	return (
		<div>
			{isLoggedIn && <Navigate to='/' />}
			<Header />
			<form className='auth-form' onSubmit={handleSubmit}>
				<input placeholder='username' type='text' onChange={(e) => setUsername(e.target.value)} />
				<input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Login
