const mongoose = require('mongoose')

const Card = mongoose.model('Card', {
    pokemon: {
        type: String,
        required: true
    },
    pokemon_type: {
        type: String
    },
    img: {
        type: String
    }
})