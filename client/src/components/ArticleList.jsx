import React from 'react';
import '../App.css';
import { format, formatISO } from 'date-fns';
import { Link } from 'react-router-dom';

function ArticleList({ prop }) {
	return (
		<div className="article-entry">
			<section>
				<Link to={`/view/${prop._id}`}>
					<img id="article-img" src={prop.image} alt="profile_image" />
				</Link>
			</section>

			<article>
				<div>
					<Link to={`/view/${prop._id}`}>
						<b>{prop.title}</b>
					</Link>
					<div style={{ display: 'flex', gap: '3px' }}>
						<p style={{ color: '#444a', marginTop: '5px' }}>@{prop.username}</p>
						<p style={{ color: '#444a', marginTop: '5px' }}>&bull;</p>
						<p style={{ color: '#444a', marginTop: '5px' }}>{format(new Date(prop.updatedAt), 'do MMMM yyyy')}</p>

					</div>

				</div>
				<p>{prop.summary}</p>
			</article>
		</div>
	);
}

export default ArticleList;
