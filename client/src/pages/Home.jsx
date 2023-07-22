import React, { useEffect, useState, useContext } from 'react';
import ArticleList from '../components/ArticleList';
import '../App.css';
import Header from '../components/Header';
import axios from 'axios';
import { MyContext } from './context';
import { parseISO, format } from 'date-fns';

function Home() {
	const [article, setArticle] = useState([]);
	const { baseEndPoint } = useContext(MyContext);

	useEffect(() => {
		axios.get(baseEndPoint + '/posts').then((response) => {
			setArticle(response.data);
		});
	}, []);

	return (
		<>
			<Header />
			{article.length == 0 ? (
				<b>Loading . . . </b>
			) : (
				<main>
					{
						article
							.sort((a, b) => {
								let aUnix = new Date(a).getTime()
								let bUnix = new Date(b).getTime()
								return bUnix - aUnix
							})
							.map((v) => {
								return <ArticleList key={v._id} prop={v} />;
							})
					}
				</main>
			)}
		</>
	);
}

export default Home;
