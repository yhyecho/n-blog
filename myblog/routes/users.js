const express = require('express')
const router = express.Router()

router.get('/:name', (req, resp) => {
    resp.send(`Hello ${req.params.name}`)
})

module.exports = router