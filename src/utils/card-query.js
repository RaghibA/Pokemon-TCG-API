const pokemon = require('pokemontcgsdk')
const config = require('./config')
const request = require('request')


const findCards = (name) => {
    pokemon.configure({apiKey: config.key})

    // split query
    query = name.split(/\s+/)
    if (query.length > 1) {

        pokemon.card.all({ q: `name:${query[0]} (subtypes:${query[1]})`})
        .then((cards) => {
            if (cards) {
                console.log(cards[0])
            }
        })
    }
}

findCards('pikachu vmax')