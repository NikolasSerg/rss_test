const { Schema, model } = require('mongoose')

const postSchema = new Schema({
    guid: {
        type: String,
        require: true
    },
    creator: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: () => Date.now(),
        immutable: true
    },
    content: {
        type: String,
        require: true
    },
    contentSnippet: {
        type: String,
        require: true
    }
})

module.exports = model('Post', postSchema)