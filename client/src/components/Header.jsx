import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../pages/context';
import Cookies from 'js-cookie'


function Header() {
	const [username, setUsername] = useState('')
	const param = useParams();
	const location = useLocation()
	const { baseEndPoint } = useContext(MyContext);
	const [deleted, setDeleted] = useState(false);
	const [ownsPost, setOwnsPost] = useState(false)

	useEffect(() => {
		console.log('verify=>', baseEndPoint, '/verify')

		axios.get(baseEndPoint + '/verify',
			{
				headers: { Authorization: `Beaerer ${Cookies.get('token')}` }
			}
		).then((response => {
			let currentUsername = response.data.username;
			console.log(response.data)
			setUsername(currentUsername)
			if (param.post_id) {
				axios.get(baseEndPoint + `/post/${param.post_id}`,
					{
						headers: { Authorization: `Beaerer ${Cookies.get('token')}` }
					})
					.then((response) => {
						if (response.data.username == currentUsername) {
							setOwnsPost(true)
						}
					})
					.then(e => { console.log(e.message, e) });
			}
		})).catch(e => { console.log(e.message, e) })
	}, [])

	const handleLogout = () => {
		Cookies.set('token', '')
		alert('Logged Out')
	}

	const handleDelete = (e) => {
		axios.delete(baseEndPoint + `/post/${param.post_id}`,
			{
				headers: {
					Authorization: `Bearer ${Cookies.get('token')}`
				}
			})
			.then((response) => {
				alert("Item Deleted")
				setDeleted(true)
			})
	}

	return (
		<div>
			{deleted && <Navigate to='/' />}
			<header>

				<Link to='/'>
					<h1>Blog Reader</h1>
				</Link>


				<nav>
					{location.pathname == '/login' &&
						<div>
							<Link to='/'>View all</Link>
							&nbsp;
							&nbsp;
							<Link to='/register'>Register</Link>
						</div>
					}
					{location.pathname == '/register' &&
						<div>
							<Link to='/'>View all</Link>
							&nbsp;
							&nbsp;
							<Link to='/login'>Login</Link>
						</div>
					}
					{location.pathname == '/' &&
						<div>
							{username ?
								<>
									<Link to='/create'>Create Post</Link>
									&nbsp;
									&nbsp;
									<Link to='/login' onClick={handleLogout}>Logout</Link>
									&nbsp;
									&nbsp;
									<a style={{ color: 'teal' }}>{username}</a>
								</> : (
									<>
										<Link to='/login'>Login</Link>
										&nbsp;
										&nbsp;
										<Link to='/register'>Register</Link>
									</>
								)
							}

						</div>
					}

					{
						ownsPost && location.pathname == `/view/${param.post_id}` &&
						<>
							<Link to={`/edit/${param.post_id}`}>Modify this Post</Link>
							&nbsp;
							&nbsp;
							<Link style={{ color: 'red' }} onClick={handleDelete}>Delete this post</Link>
						</>
					}

				</nav>
			</header >
			<hr />
		</div>
	);
}

export default Header;
