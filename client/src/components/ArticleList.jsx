import React from 'react';
import '../App.css';
import { format } from 'date-fns';
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
					<p style={{ color: '#444a', marginTop: '5px' }}>{format(parseInt(prop.updatedAt), 'd-MMM-yyyy')}</p>
				</div>
				<p>{prop.summary}</p>
			</article>
		</div>
	);
}

export default ArticleList;
