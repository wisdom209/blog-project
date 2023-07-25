import React, { useContext, useState, useEffect } from 'react';
import { Link, Navigate, useParams, useLocation } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../pages/context';

function Header() {
	const [username, setUsername] = useState('')
	const param = useParams();
	const location = useLocation()
	const { baseEndPoint } = useContext(MyContext);
	const [deleted, setDeleted] = useState(false);
	const [ownsPost, setOwnsPost] = useState(false)
	axios.defaults.withCredentials = true;

	useEffect(() => {
		console.log('verify=>', baseEndPoint, '/verify')
		fetch(baseEndPoint + '/verify', {
			method: 'GET',
			credentials: 'include'
		})
			.then(response => response.json())
			.then(data => {
				let currentUsername = data.username;
				console.log(data);
				setUsername(currentUsername);
				if (param.post_id) {
					fetch(baseEndPoint + `/post/${param.post_id}`, {

						method: 'GET',
						credentials: 'include'
					})
						.then(response => response.json())
						.then(data => {
							if (data.username == currentUsername) {
								setOwnsPost(true);
							}
						})
						.catch(error => console.error(error));
				}
			})
			.catch(error => console.error(error));
	}
		, [])

	const handleLogout = () => {
		axios.get(baseEndPoint + '/logout', { method: 'GET', withCredentials: true }).then((response) => {
			alert(response.data)
		})
	}

	const handleDelete = (e) => {
		axios.delete(baseEndPoint + `/post/${param.post_id}`, { method: 'DELETE', withCredentials: true })
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
