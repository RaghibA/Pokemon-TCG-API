const mongoose = require('mongoose')
const chalk = require('chalk')

mongoose.connect('mongodb://127.0.0.1:27017/pokedeck', {
    useNewUrlParser: true,
    useCreateIndex: true
}, (e) => {
    if (e) {
        console.log(chalk.red.inverse('ERROR: Unable to connected to MongoDB'))
    } else {
        console.log(chalk.blue.inverse('Connected to MongoDB'))
    }
})