import React, { useEffect, useState, useContext } from 'react';
import ArticleList from '../components/ArticleList';
import '../App.css';
import Header from '../components/Header';
import axios from 'axios';
import { MyContext } from './context';

function Home() {
	const [article, setArticle] = useState([]);
	const { baseUrl, baseEndPoint } = useContext(MyContext);

	useEffect(() => {
		axios.get(baseEndPoint + 'posts').then((response) => {
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
					{article.map((v, i) => {
						return <ArticleList key={v.id} prop={v} />;
					})}
				</main>
			)}
		</>
	);
}

export default Home;
