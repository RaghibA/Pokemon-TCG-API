const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')

const User = require('./models/user')

// Init express 
const app = express()
const port = process.env.port || 3000

app.use(express.json())

//! User API Endpoints
// Create User
app.post('/users', (req, res) => {
    const user = new User(req.body)

    user.save().then(() => {
        console.log(chalk.green('User created'))
        res.status(201).send(user)
    }).catch((e) => {
        console.log(chalk.red('Unable to create user.'))
        res.status(400).send(e)
    })
})

// Get ALL users
app.get('/users', (req, res) => {
    User.find({}).then((user) => {
        console.log(chalk.green('Users found'))
        res.status(200).send(user)
    }).catch((e) => {
        console.log(chalk.red('Unable to find users'))
        res.status(400).send(e)
    })
})

// Get user by ObjectID
app.get('/users/id/:id', (req, res) => {
    const _id = req.params.id

    User.findById(_id).then((user) => {
        if (!user) {
            // If no user is found
            console.log(chalk.red('ERROR: Unable to find user with given ID'))
            return res.status(404).send({e:'err'})
        }
        console.log(chalk.green('Found user with given ID'))
        res.send(user)
    }).catch((e) => {
        console.log(chalk.red('ERROR: Find user by ID'))
        res.status(500).send(e)
    })
})

// Get user by username
app.get('/users/username/:username', (req, res) => {
    const _username = req.params.username

    User.findOne({ username: _username}).then((user) => {
        if (!user) {
            // no user found
            console.log(chalk.red('ERROR: No user with given username found'))
            return res.status(404).send({e:'err'})
        }
        console.log(chalk.green('Found user with given username'))
        res.send(user)
    }).catch((e) => {
        console.log(chalk.red('ERROR: Find user by username'))
        res.status(500).send(e)
    })
})


// Listen for connection
app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is running on port ${port}`))
})