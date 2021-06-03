const pokemon = require('pokemontcgsdk')
const config = require('./config')
const request = require('request')


const findCards = (query, callback) => {
    pokemon.configure({apiKey: config.key})

    // split query
    parsedQuery = query.split(/\s+/)
    if (parsedQuery.length > 1) {

        pokemon.card.where({ q: `name:${parsedQuery[0]} (subtypes:${parsedQuery[1]})`, pageSize: 10, page: 1})
        .then((results) => {
            if (results) {
                callback(undefined, results.data)
            }
        })
    } else {
        pokemon.card.where({ q: `name:${parsedQuery[0]}`, pageSize: 10, page: 1})
        .then((results) => {
            if (results) {
                callback(undefined, results.data)
            }
        })
    }
}

module.exports = findCards