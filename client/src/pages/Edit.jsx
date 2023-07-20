import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import axios from 'axios';
import { MyContext } from './context';
import { useParams, Navigate } from 'react-router-dom';

function Edit() {
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [paragraph, setParagraph] = useState('');
	const [updateData, setUpdateData] = useState({});
	const { baseUrl, baseEndPoint } = useContext(MyContext);
	const { post_id } = useParams();
	const [articlePosted, setArticlePosted] = useState(false);

	useEffect(() => {
		axios
			.get(baseEndPoint + `post?id=${post_id}`)
			.then((response) => {
				setTitle(response.data.title);
				setSummary(response.data.summary);
				setParagraph(response.data.paragraph);
				setUpdateData(response.data);
			})
			.catch((error) => {
				alert(error);
			});
	}, []);

	const handleSubmit = (e) => {
		e.preventDefault();
		const data = { ...updateData, title, summary, paragraph };
		axios
			.put(baseEndPoint + 'post', data)
			.then((response) => {
				alert('Successfully modified post');
				setArticlePosted(true);
			})
			.catch((error) => {
				alert(error.message);
			});
	};

	return (
		<div>
			<Header />

			{articlePosted && <Navigate to="/" replace={true} />}

			<h2 style={{ textAlign: 'center' }}>Lets Modify this post</h2>
			<form className="auth-form" onSubmit={handleSubmit}>
				<input
					placeholder="Title"
					type="text"
					value={title}
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>
				<input
					placeholder="Summary"
					type="text"
					value={summary}
					onChange={(e) => {
						setSummary(e.target.value);
					}}
				/>
				<textarea
					rows={5}
					cols={50}
					placeholder="Enter your text"
					value={paragraph}
					onChange={(e) => {
						setParagraph(e.target.value);
					}}
				/>
				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Edit;
