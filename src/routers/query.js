const express = require('express')
const router = express.Router()
const cardQuery = require('../utils/card-query')

router.get('/search', (req, res) => {
    if (!req.body.search) { return res.status(404).send() }
    res.send()
    cards = cardQuery(req.body.search)
    console.log(cards)
})

module.exports = router