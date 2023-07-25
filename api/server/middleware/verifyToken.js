const jwt = require('jsonwebtoken')

/* VERIFY TOKEN */
const verifyToken = (req, res, next) => {
	try {
		const authHeader = req.headers.authorization;
		const token = authHeader.split(' ')[1]
		jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
			if (err) return res.status(401).json({ status: 'unauthorized' })
			req.user = decoded
			next()
		})
	} catch (error) {
		console.log(error.message)
		return res.status(500).json(error)
	}
}
module.exports = verifyToken
