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
		axios.get(baseEndPoint + '/verify', {withCredentials: true, headers:{}}).then((response => {
			console.log('get verify', response.data)
			setUsername(response.data.username)
		})).catch(err => {
			console.log('err', err)
		})
	}, [])



	return (
		<div>
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
									<Link to='/create/post_id'>Create Post</Link>
									&nbsp;
									&nbsp;
									<Link to='/login'>Logout</Link>
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
							<a>Modify this Post</a>
							&nbsp;
							&nbsp;
							<a>Delete this post</a>
						</>
					}

				</nav>
			</header >
			<hr />
		</div>
	);
}

export default Header;
