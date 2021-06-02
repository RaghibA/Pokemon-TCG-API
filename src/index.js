const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')
const userRouter = require('./routers/user')

// Init express 
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)

// Listen for connection
app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is running on port ${port}`))
})