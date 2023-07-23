const express = require('express')
const router = express.Router()
const userController = require('../controllers/userController')

router.get('/verify', userController.verifyUser)
router.post('/register', userController.registerUser)
router.post('/login', userController.loginUser)
router.get('/logout', userController.logoutUser)

module.exports = router
