const User = require('../models/User')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs')

/* REGISTER USER */
const registerUser = async (req, res) => {
	try {
		let { username, password } = req.body;
		if (password.includes(' ')) return res.status(400).json("No spaces in password")
		username = username ? username.toLowerCase().trim() : ''
		let user = await User.findOne({ username })
		if (user) return res.status(500).json('registration failed')
		password = bcrypt.hashSync(password)
		user = new User({ username, password })
		await user.save()
		res.status(200).json(user)
	} catch (error) {
		res.status(500).json(error.message)
	}
}

/* LOGIN USER */
const loginUser = async (req, res) => {
	try {
		let { username, password } = req.body;
		username = username.toLowerCase().trim()
		let user = await User.findOne({ username })
		if (!user) return res.status(401).json('invalid credentials')
		let isPassMatch = bcrypt.compareSync(password, user.password)
		if (!isPassMatch) return res.status(401).json('invalid credentials')
		let token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: 86000 })
		res.status(200).json({ username, token })

	} catch (error) {
		res.status(500).json(error)
	}
}

/* LOGOUT USER */
const logoutUser = async (req, res) => {
	try {
		res.status(200).json({ status: 'Logged out', token: '' })
	} catch (error) {
		res.status(500).json(error)
	}
}

/* VERIFY User request */
const verifyUser = (req, res) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return res.status(401).json("error", err.message, err)
			res.status(200).json({ username: decoded.username })
		})
	} catch (error) {
		console.log(error.message)
		return res.status(500).json('unauthorized')
	}
}

module.exports = { registerUser, loginUser, logoutUser, verifyUser }

