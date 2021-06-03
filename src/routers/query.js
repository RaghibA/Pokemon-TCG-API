const express = require('express')
const router = express.Router()
const cardQuery = require('../utils/card-query')

router.get('/search', (req, res) => {
    if (!req.body.search) { return res.status(404).send() }
    cardQuery(req.body.search, (err, data) => {
        if (err) { res.status(404).send() }
        else { res.send(data) }
    })
})

module.exports = router