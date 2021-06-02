const validator = require('validator')
const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    email: {
        type: String,
        unique: true,
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
    },
    tokens: [{
        token: {
            type: String,
            required: true
        }
    }]
})

//! Authenticate user
// create auth token
userSchema.methods.generateAuthToken = async function () {
    const user = this
    const token = jwt.sign({ _id: user.id.toString() }, 'secret')
    
    user.tokens = user.tokens.concat({ token })
    await user.save()

    return token
}

// authenticate user
userSchema.statics.findByCredentials = async (username, password) => {
    // Find user with corresponding email
    const user = await User.findOne({ username })
    
    if (!user) {
        throw new Error('Incorrect username or password.')
    }

    const authenticated = await bcrypt.compare(password, user.password)
    if (!authenticated) {
        throw new Error('Incorrect username or password.')
    }

    return user
}

// Hash password before saving user to db
userSchema.pre('save', async function (next) {
    const user = this
    if (user.isModified('password')) {
        user.password = await bcrypt.hash(user.password, 8)
    }
    next()
})

const User = mongoose.model('User', userSchema)
module.exports = User