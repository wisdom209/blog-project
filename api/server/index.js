const express = require('express');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser')
const cors = require('cors');
const dotenv = require('dotenv');
const PORT = process.env.PORT || 5001;
const userRouter = require('./routes/userRoute')
const postRouter = require('./routes/postRoute')
const app = express();


dotenv.config();

app.use(cookieParser())



app.use(cors({
    origin: ['https://blog-project-nosql.vercel.app/',
	'https://vercel.com/wisdom209/blog-project-nosql/8tCnNd12TMUkzB7RLyDh2b1V6xpt'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Origin', 'X-Requested-With', 'Accept', 'x-client-key', 'x-client-token', 'x-client-secret', 'Authorization'],
    credentials: true
}))

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(userRouter)
app.use(postRouter)


/* CONNECT TO DB AND START SERVER */
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
	.then((response => {
		console.log('connected')
		app.listen(PORT, () => {
			console.log(`Server: ${PORT}`);
		});
	}))
	.catch(error => {
		console.log(error)
	})



