const express = require('express')
const cors = require('cors')

const chalk = require('chalk')

require('./db/mongoose')
const userRouter = require('./routers/user')
const cardRouter = require('./routers/card')

// Init express 
const app = express()
app.use(cors())
const port = process.env.PORT || 4040

app.use(express.json())
app.use(userRouter)
app.use(cardRouter)

// Listen for connection
app.listen(port,'localhost', () => {
    console.log(chalk.green.inverse(`Server is running on port ${port}`))
})