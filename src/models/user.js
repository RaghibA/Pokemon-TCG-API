const validator = require('validator')
const mongoose = require('mongoose')

const User = mongoose.model('User', {
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true,
        validate(value) {
            if (!validator.isEmail(value)) {
                throw new console.error('Invalid Email.');
            }
        }
    },
    password: {
        type: String,
        required: true,
        trim: true,
        minlength: 7,
    }
})

module.exports = User