const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')
const Card = require('../models/card')
const cardQuery = require('../utils/card-query')

// find cards
router.get('/search', async (req, res) => {
    if (!req.body.search) { return res.status(404).send() }
    cardQuery.findCards(req.body.search, (err, data) => {
        if (err) { res.status(400).send() }
        else { res.send(data) }
    })
})

// add cards to deck by card id
router.post('/deck/add/:id', auth, async (req, res) => {
    if (!req.body) { return res.status(401).send({ error: 'No request body.' }) }
    const cardId = req.params.id

    cardQuery.findCardById(cardId, (err, card) => {
        if (err) {
            console.log(err)
            res.status(400).send(err)
        } else {
            console.log(card)
            res.send(card)
        }
    })
    // const card = new Card({
    //     name: _card.name,
    //     types: _card.types,

    //     owner: req.user._id
    // })

    // try {
    //     await card.save()
    //     res.status(200).send(card)
    // } catch (e) {
    //     res.status(400).send(e)
    // }
})

// get users deck
router.get('/deck', auth, async (req, res) => {
    try {
        const cards = await Card.find({ owner: req.user._id })
        if (cards.length === 0) {
            res.status(401).send({error: 'No cards in users deck.'})
        }
        res.send(cards)
    } catch (e) {
        res.status(500).send(e)
    }
})

// delete cards
router.delete('/deck/remove/:id', auth, async (req, res) => {
    const cardId = req.params.id
    try {
        const card = await Card.findOneAndDelete({ _id: cardId })
        if (!card) {
            return res.status(400).send()
        }
        res.send(card)
    } catch (e) {
        return res.status(400).send(e)
    }
})

module.exports = router