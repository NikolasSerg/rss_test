const { Router } = require('express')
const UserController = require('../controllers/user.controller')
const PostController = require('../controllers/post.controller')
const router = new Router()
const { body } = require('express-validator')
const authMiddleware = require('../middleware/auth.middleware')

router.post(
    '/registration',
    body('email').isEmail(),
    body('password').isLength({ min: 3, max: 13 }),
    UserController.registration
)
router.post('/login', UserController.login)
router.get('/logout', UserController.logout)
router.get('/activate/:link', UserController.activate)
router.get('/refresh', UserController.refresh)
router.get('/rss_posts', PostController.getAllRssPosts)
router.get('/users', authMiddleware, UserController.getUsers)
router.get('/posts/:count', authMiddleware, PostController.getPosts)
router.post('/add_post', authMiddleware, PostController.addPost)
router.delete('/delete_post/:id', authMiddleware, PostController.deletePost)
router.get('/search', authMiddleware, PostController.searchPosts)

module.exports = router




