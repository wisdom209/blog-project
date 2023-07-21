import React, { useContext, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from '../pages/context';

function Header() {
	const param = useParams();
	const { baseEndPoint } = useContext(MyContext);
	const [deleted, setDeleted] = useState(false);

	return (
		<header>
			{deleted && <Navigate to="/" replace={true} />}
			<div>
				<Link to="/">
					<div>
						<h1>BLOG READER</h1>
					</div>
				</Link>
				<nav>
					{JSON.stringify(param) === '{}' ? (
						<Link to="/create">
							<span style={{ marginLeft: '1.5rem' }}>Create Post</span>
						</Link>
					) : (
						<div>
							<Link to={`/edit/${param.post_id}`}>Modify this post</Link>
							&nbsp;
							<a
								style={{
									background: 'none',
									border: 'none',
									color: 'red',
									textDecoration: 'none',
									cursor: 'pointer',
									marginLeft: '5px',
									fontWeight: 'bold'
								}}
								onClick={(e) => {
									axios
										.delete(baseEndPoint + `post?id=${param.post_id}`)
										.then((response) => {
											alert('Post deleted');
											setDeleted(true);
										})
								}}
							>
								Delete this post
							</a>
						</div>
					)}
				</nav>
			</div>
			<hr />
		</header>
	);
}

export default Header;
