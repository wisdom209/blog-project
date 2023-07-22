import React, { useState, useContext } from 'react'
import Header from '../components/Header'
import { MyContext } from './context'
import { Navigate } from 'react-router-dom'

function Register() {

	const [username, setUsername] = useState()
	const [password, setPassword] = useState()
	const { baseEndPoint } = useContext(MyContext)
	const [isRegistered, setIsRegistered] = useState(false)

	const handleSubmit = (e) => {
		e.preventDefault()
		axios.post(baseEndPoint + '/register', { username, password }, { withCredentials: true }).then(response => {
			alert("Registeration Successful")
			setIsRegistered(true)
		}).catch(error => {
			console.log(error)
		})
	}

	return (
		<div>
			{isRegistered && <Navigate to='/login' />}
			<Header />
			<form className='auth-form' onSubmit={handleSubmit}>
				<input placeholder='username' type='text' onChange={(e) => setUsername(e.target.value)} />
				<input placeholder='password' type='password' onChange={(e) => setPassword(e.target.value)} />
				<button type='submit'>Login</button>
			</form>
		</div>
	)
}

export default Register	
