const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')

const User = require('./models/user')

// Init express 
const app = express()
const port = process.env.port || 3000

app.use(express.json())


// Listen for connection
app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is running on port ${port}`))
})