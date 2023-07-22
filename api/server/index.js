const express = require('express');
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const dotenv = require('dotenv');
const Post = require('./models/Post')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/blogreader"
const app = express();

dotenv.config();

app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


/* CONNECT TO DB AND START SERVER */
mongoose.connect(MONGO_URI)
	.then((response => {
		console.log('connected')
		app.listen(PORT, () => {
			console.log(`Server: ${PORT}`);
		});
	}))
	.catch(error => {
		console.log(error.message)
	})

/* VERIFY TOKEN */
const verifyToken = (req, res, next) => {

	try {
		const token = req.cookies.jwt;
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return res.status(401).json({ status: 'unauthorized' })
			req.user = decoded
			next()
		})
	} catch (error) {
		return res.status(500).json(error)
	}
}
/* VERIFY User request */
app.get('/verify', (req, res) => {
	try {
		const token = req.cookies.jwt;
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return res.status(401).json(err)
			res.status(200).json({ username: decoded.username })
		})
	} catch (error) {
		return res.status(500).json('unauthorized')
	}
})

/* GET ALL POSTS */
app.get('/posts', async (req, res) => {
	try {
		let posts = await Post.find()
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json(error)
	}
});

/* GET A POST */
app.get('/post/:id', async (req, res) => {
	try {
		const id = req.params.id;
		let post = await Post.findOne({ _id: id })
		post.updatedAt = Math.floor(Date.parse(post.updatedAt)) / 1000
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error)
	}
});

/* CREATE A POST */
app.post('/post', verifyToken, async (req, res) => {
	try {
		let post = {
			title,
			summary,
			paragraph,
			image,
			username
		} = req.body;

		post = new Post({ ...post, username: req.user.username });
		await post.save();
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json(error)
	}
});

/* UPDATE A POST */
app.put('/post', verifyToken, async (req, res) => {
	try {
		let { _id, title, paragraph, image, summary } = req.body;
		let post = { title, paragraph, image, summary, paragraph }
		post = await Post.findOneAndUpdate({ _id }, post, { new: true })
		res.status(200).json(post)
	} catch (error) {
		res.status(500).json(error.message)
	}
});

/* DELETE A POST */
app.delete('/post/:id', verifyToken, async (req, res) => {
	try {
		const id = req.params.id;
		await Post.findOneAndDelete({ _id: id }, { new: true })
		res.status(200).json(`Item ${id} deleted`)
	} catch (error) {
		res.status(500).json(error)
	}
});

/* REGISTER USER */
app.post('/register', async (req, res) => {
	try {
		let { username, password } = req.body;
		let user = await User.findOne({ username })
		if (user) return res.status(500).json('registration failed')
		password = bcrypt.hashSync(password)
		user = new User({ username, password })
		await user.save()
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json(error)
	}
})

/* LOGIN USER */
app.post('/login', async (req, res) => {
	try {
		let { username, password } = req.body;
		let user = await User.findOne({ username })
		if (!user) return res.status(401).json('invalid credentials')
		let isPassMatch = bcrypt.compareSync(password, user.password)
		if (!isPassMatch) return res.status(401).json('invalid credentials')
		let token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 86000 })
		res.cookie('jwt', token, { httpOnly: true })
		res.status(200).json({ username })

	} catch (error) {
		res.status(500).json(error)
	}
})

/* LOGIN USER */
app.get('/logout', async (req, res) => {
	try {
		res.cookie('jwt', '', { expires: new Date(0), httpOnly: true })
		res.status(200).json('Logged out')
	} catch (error) {
		res.status(500).json(error)
	}
})



