const { Schema, model } = require('mongoose')

const userSchema = new Schema ({
    email: {
        type: String,
        uniq: true,
        require: true
    },
    password: {
        type: String,
        require: true
    },
    isActivated: {
        type: Boolean,
        default: false
    },
    activationLink: {
        type: String
    }
})

module.exports = model('User', userSchema)