const express = require('express');
const mongoose = require('mongoose')
const cors = require('cors');
const crypto = require('crypto');
const dotenv = require('dotenv');
const axios = require('axios');
const { image_search } = require('duckduckgo-images-api');
const { error } = require('console');
const PORT = 5001;



let baseEndPoint =
	'https://y65inptf23.execute-api.us-east-1.amazonaws.com/prod/';

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


mongoose.connect("mongodb://27017/blogreader")
	.then((response => {
		console.log('connected')
	}))
	.catch(error => {
		console.log(error.message)
	})


/* GET ALL POSTS */
app.get('/posts', (req, res) => {
	axios
		.get(baseEndPoint + 'posts')
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			res.status(400).json(error.message);
		});
});

/* GET A POST */
app.get('/post/:id', (req, res) => {
	const id = req.params.id;
	axios
		.get(baseEndPoint + `post?id=${id}`)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			res.status(400).json(error.message);
		});
});

/* CREATE A POST */
app.post('/post', (req, res) => {
	const allowedImages = [
		'cars',
		'sports',
		'shopping',
		'electronics',
		'animals',
	];
	let image = allowedImages.includes(req.body.image)
		? req.body.image
		: 'trends';

	image_search({ query: image, moderate: true })
		.then((results) => {
			image =
				results[Math.floor(Math.random() * (results.length - 1)) + 1].image;

			const { title, summary, paragraph } = req.body;
			const post = {
				id: `${crypto.randomUUID()}`,
				title,
				summary,
				paragraph,
				image,
				username: 'Jeff Saliba',
				date: Date.now(),
			};
			axios
				.post(`${baseEndPoint}post`, post)
				.then((response) => {
					return res.status(200).json(post);
				})
				.catch((error) => {
					return res.status(500).json(error.message);
				});
		})
		.catch((error) => res.status(500).json(error.message));
});

/* UPDATE A POST */
app.put('/post', (req, res) => {
	const post = req.body;
	console.log(post);
	axios
		.put(baseEndPoint + 'post', post)
		.then((response) => {
			res.status(200).json(response.data);
		})
		.catch((error) => {
			res.status(400).json(error.message);
		});
});

/* DELETE A POST */
app.delete('/post/:id', (req, res) => {
	const { id } = req.params;

	axios
		.delete(baseEndPoint + `post?id=${id}`)
		.then((response) => {
			console.log(response.data);
			res.status(200).json(response.data);
		})
		.catch((error) => {
			res.status(200).json({ id });
		});
});



app.listen(PORT, () => {
	console.log(`Server: ${PORT}`);
});
