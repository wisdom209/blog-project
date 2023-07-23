const jwt = require('jsonwebtoken')

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
module.exports = verifyToken
