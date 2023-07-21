import React, { useContext, useEffect, useState } from 'react';
import Header from '../components/Header';
import { Navigate } from 'react-router-dom';
import axios from 'axios';
import { MyContext } from './context';
import { nanoid } from 'nanoid'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'

function Create() {
	const [author, setAuthor] = useState('')
	const [title, setTitle] = useState('');
	const [summary, setSummary] = useState('');
	const [paragraph, setParagraph] = useState('');
	const [postCreated, setPostCreated] = useState(false);
	const [image, setImage] = useState('cars');
	const { baseEndPoint } = useContext(MyContext);


	const handleSubmit = (e) => {
		e.preventDefault();
		axios.get('./image.json').then(result => {
			let len = result.data[image].length;
			let img = result.data[image][Math.floor(Math.random() * (len - 1)) + 1].image

			const post = {
				id: `${nanoid()}`,
				username: author,
				title,
				summary,
				paragraph,
				image: img,
				date: Date.now(),
			};

			axios
				.post(`${baseEndPoint}post`, post)
				.then((response) => {
					alert('Post created successfully');
					setPostCreated(true);
				})
		})
	};

	return (
		<div>
			<Header />
			{postCreated && <Navigate to="/" replace={true} />}
			<h2 style={{ textAlign: 'center' }}>Create a brand new post</h2>
			<form className="auth-form" onSubmit={handleSubmit}>
				<input
					placeholder="Author"
					type="text"
					onChange={(e) => {
						setAuthor(e.target.value);
					}}
				/>
				<input
					placeholder="Title"
					type="text"
					onChange={(e) => {
						setTitle(e.target.value);
					}}
				/>

				<label for="cars" style={{ marginTop: '10px' }}>
					Choose a Category:
				</label>
				<select
					style={{ width: '50%', margin: '5px 10px', padding: '10px' }}
					name="image"
					onChange={(e) => {
						setImage(e.target.value);
					}}
				>
					<option value="cars">Cars</option>
					<option value="sports">Sports</option>
					<option value="animals">Animals</option>
					<option value="electronics">Electronics</option>
					<option value="shopping">Shopping</option>
				</select>
				<input
					placeholder="Summary"
					type="text"
					onChange={(e) => {
						setSummary(e.target.value);
					}}
				/>
				<div class="quil">
					<ReactQuill style={{
						marginTop: '10px',
						border: '1px solid #aaa',
						borderRadius: '5px',
					}} theme='snow' value={paragraph} onChange={setParagraph} placeholder='Enter your text' />
				</div>

				<button type="submit">Submit</button>
			</form>
		</div>
	);
}

export default Create;
