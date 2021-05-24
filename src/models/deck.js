const mongoose = require('mongoose')

const Deck = mongoose.model('Deck', {
    userId: {
        type: mongoose.Types.ObjectId()
    },
    deckName: {
        type: String,
        default: 'My Deck',
        trim: true
    },
    
})