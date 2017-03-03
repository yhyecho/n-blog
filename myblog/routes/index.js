const express = require('express')
const router = express.Router()

router.get('/', (req, resp) => {
    resp.send('Hello express.Router')
})

module.exports = router
