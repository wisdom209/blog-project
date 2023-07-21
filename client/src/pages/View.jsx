import React, { useEffect, useState, useContext } from 'react';
import { format } from 'date-fns';
import Header from '../components/Header';
import '../App.css';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from './context';

function View() {
	const { post_id } = useParams();
	const [article, setArticle] = useState('');
	const { baseEndPoint } = useContext(MyContext);

	useEffect(() => {
		axios.get(baseEndPoint + `post?id=${post_id}`).then((response) => {
			setArticle(response.data);
		});
	}, []);

	const date = article.date
		? format(parseInt(article.date), 'd-MMMM-yyyy')
		: 'Some time ago';

	return (
		<div className="view">
			<Header />
			{article.length == 0 ? (
				<b>Loading . . . </b>
			) : (
				<div>
					<img src={article.image} alt="profile_image" />
					<h2>{article.title}</h2>
					<p>
						by {article.username} &bull; <span>{date}</span>
					</p>
				</div>
			)}
			<article>{article.paragraph}</article>
		</div>
	);
}

export default View;
