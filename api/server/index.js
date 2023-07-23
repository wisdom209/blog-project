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
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoute')
const app = express();

dotenv.config();

app.use(cookieParser())
app.use(cors({ origin: 'http://localhost:5173', credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter)
app.use(postRouter)


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



