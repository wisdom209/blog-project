const express = require('express')
const router = express.Router()
const postController = require('../controllers/postController')
const verifyToken = require('../middleware/verifyToken')

router.get('/posts', postController.getPosts)
router.get('/post/:id', postController.getPost)
router.post('/post', verifyToken, postController.createPost)
router.put('/post', verifyToken, postController.updatePost)
router.delete('/post/:id', verifyToken, postController.deletePost);

module.exports = router
