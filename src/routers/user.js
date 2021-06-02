const express = require('express')
const User = require('../models/user')
const auth = require('../middleware/auth')
const router = express.Router()

//! User API Endpoints
// Create User
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
        res.status(201).send({user,token})
    } catch (e) {
        res.status(400).send(e)
    }
})

// Log in user
router.post('/users/login', async (req, res) => {
    try {
        const user = await User
            .findByCredentials(req.body.username, req.body.password)
        const token = await user.generateAuthToken()
        res.send({user, token})
    } catch (e) {
        res.status(400).send()
    }
})

// Get user
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user) // from auth
})

module.exports = router