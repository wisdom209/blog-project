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

	useEffect(() => {
		axios.get(baseEndPoint + '/verify', { withCredentials: true }).then((response => {
			console.log('get verify', response.data)
			setUsername(response.data.username)
		})).catch(err => {
			console.log('err', err)
		})
	}, [])

	const handleLogout = () => {
		axios.get(baseEndPoint + '/logout', { withCredentials: true }).then((response) => {
			alert(response.data)
		})
			.catch(err => {
				console.log(err.message)
			})
	}

	const handleDelete = (e) => {
		axios.delete(baseEndPoint + `/post/${param.post_id}`, { withCredentials: true })
			.then((response) => {
				alert("Item Deleted")
				setDeleted(true)
			})
			.catch(err => {
				console.log(err.message)
			})
	}

	return (
		<div>
			{deleted && <Navigate to='/' />}
			<header>
				<div>
					<Link to='/'>
						<h1>Blog Reader</h1>
					</Link>
				</div>

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
									<a>{username}</a>
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
						!username && location.pathname == `/view/${param.post_id}` &&
						<Link to="/login">Login</Link>
					}
					{
						username && location.pathname == `/view/${param.post_id}` &&
						<>
							<Link to={`/edit/${param.post_id}`}>Modify this Post</Link>
							&nbsp;
							&nbsp;
							<Link onClick={handleDelete}>Delete this post</Link>
						</>
					}

				</nav>
			</header >
			<hr />
		</div>
	);
}

export default Header;
