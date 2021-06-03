const express = require('express')
const chalk = require('chalk')
require('./db/mongoose')
const userRouter = require('./routers/user')
const queryRouter = require('./routers/query')

// Init express 
const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(userRouter)
app.use(queryRouter)

// Listen for connection
app.listen(port, () => {
    console.log(chalk.green.inverse(`Server is running on port ${port}`))
})