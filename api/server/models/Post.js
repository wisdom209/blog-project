const mongoose = require('mongoose')

const postSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true
	},
	title: {
		type: String,
		required: true
	},
	summary: {
		type: String,
		required: true
	},
	image: {
		type: String,
		required: true,
		default: "https://www.techprevue.com/wp-content/uploads/2015/03/top-educational-blogs.jpg"
	},
	paragraph: {
		type: String,
		required: true
	}
}, { timestamps: true })

const Post = mongoose.model('Post', postSchema);
module.exports = Post
