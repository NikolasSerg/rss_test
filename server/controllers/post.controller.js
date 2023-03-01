const PostService = require('../services/post.service')

class PostController {
    async getAllRssPosts (req, res, next) {
        try {
            const posts = await PostService.getAllRssPost()
            res.status(200).json({status: 'success', data: posts})
        } catch (error) {
            next(error)
        }

    }

    async getPosts (req, res, next) {
        const count = req.params['count']

        try {
            const posts = await PostService.getPost(count)
            res.status(200).json({status: 'success', data: posts})
        } catch (error) {
            next(error)
        }

    }

    async addPost (req, res, next) {
        const { post } = req.body
        try {
            const savedPost = await PostService.addPost(post)
            res.status(200).json({status: 'success', data: savedPost})
        } catch (error) {
            next(error)
        }
    }

    async deletePost (req, res, next) {
        const id = req.params['id']
        try {
            await PostService.deletePost(id)
            res.status(200).json({status: 'success', data: {}})
        } catch (error) {
            next(error)
        }
    }

    async searchPosts (req, res, next) {
        const text = req.query['text']
        try {
            const posts = await PostService.searchPosts(text)
            res.status(200).json({status: 'success', data: posts})
        } catch (error) {
            next(error)
        }
    }
}

module.exports = new PostController()






