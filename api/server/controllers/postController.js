const Post = require('../models/Post')

/* GET ALL POSTS */
const getPosts = async (req, res) => {
	try {
		let posts = await Post.find()
		res.status(200).json(posts);
	} catch (error) {
		res.status(500).json(error)
	}
};

/* GET A POST */
const getPost = async (req, res) => {
	try {
		const id = req.params.id;
		let post = await Post.findOne({ _id: id })
		post.updatedAt = Math.floor(Date.parse(post.updatedAt)) / 1000
		res.status(200).json(post);
	} catch (error) {
		res.status(500).json(error)
	}
};

/* CREATE A POST */
const createPost = async (req, res) => {
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
		console.log('token', error.message)
		res.status(500).json(error)
	}
};

/* UPDATE A POST */
const updatePost = async (req, res) => {
	try {

		let { _id, title, paragraph, image, summary } = req.body;
		let post = { title, paragraph, image, summary, paragraph }
		post = await Post.findById(_id)
		if (req.user.username == post.username) {
			post = await Post.findOneAndUpdate({ _id }, req.body, { new: true })
		}
		else {
			return res.status(401).json('unauthorized')
		}
		res.status(200).json(post)
	} catch (error) {
		console.log('err', error.message)
		res.status(500).json(error.message)
	}
};

/* DELETE A POST */
const deletePost = async (req, res) => {
	try {
		const id = req.params.id;
		await Post.findOneAndDelete({ _id: id }, { new: true })
		res.status(200).json(`Item ${id} deleted`)
	} catch (error) {
		res.status(500).json(error)
	}
};

module.exports = { getPosts, getPost, createPost, updatePost, deletePost }
