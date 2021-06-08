const mongoose = require('mongoose')

const Card = mongoose.model('Card', {
    pokemon: {
        type: String,
        required: true
    },
    pokemon_type: {
        type: String
    },
    value: {
        type: Number
    },
    img: {
        type: String
    },
    owner: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    }
})

module.exports = Card