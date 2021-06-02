const pokemon = require('pokemontcgsdk')
const config = require('./config')
const request = require('request')

const findCards = (name, set = '') => {
    pokemon.configure({ apiKey: config.key })

    pokemon.card.all({
        name: name,
        set: set,
        pageSize: 15,
        page: 1
    }).then(result => {
        console.log(result)
    }).catch(e => {
        console.log('ERROR')
    })
}

findCards('pikachu vmax')