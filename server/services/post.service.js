let Parser = require('rss-parser')
const PostDto = require("../dto/postDTO");
let parser = new Parser()
const PostModel = require('../models/post.model')
const ApiError = require("../exceptions/api.error");
const {isEmpty} = require("lodash");
const {isNull} = require("lodash/lang");
const postConstants = require("../constants/post.constants");

class PostService {
    async getAllRssPost() {
        let feed = await parser.parseURL('https://lifehacker.com/rss');
        if(isEmpty(feed)) {
            throw ApiError.BadRequest('The Error fetching data from uri')
        }
        return feed.items.map((item) => {
            return new PostDto(item)
        })
    }

   async getPost(count) {
        const skipNumber = postConstants.GET_LIMIT * (count - 1)

       const posts = await PostModel
           .find()
           .skip(skipNumber)
           .limit(postConstants.GET_LIMIT)

       const totalLengthCollection = await PostModel.countDocuments()

        if(isEmpty(posts)) {
            throw ApiError.BadRequest('There are no posts yet')
        }
        return {posts, totalLengthCollection}
    }

    async addPost(post) {
        if (post.guid) {
            const postFound = await PostModel.find({guid: post.guid})
            if (!isEmpty(postFound)) {
                throw ApiError.BadRequest('This post exist in your library')
            }
        }
        const postCreated = await PostModel.create(post)
        return postCreated
    }

    async deletePost(id) {
        const postFound = await PostModel.find({_id: id})
        if (isEmpty(postFound)) {
            throw ApiError.BadRequest('This post not found')
        }
        const postCreated = await PostModel.deleteOne({_id: id})
        return postCreated
    }

    async searchPosts(text) {
        const regex = new RegExp(text, "i");
        const postFound = await PostModel.find({title: regex})
        if (isEmpty(postFound)) {
            throw ApiError.BadRequest('This post not found')
        }
        return postFound
    }
}

module.exports = new PostService()




