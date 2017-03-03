const express = require('express')
const router = express.Router()

router.get('/:name', (req, resp) => {
    // resp.send(`Hello ${req.params.name}`)
    // 渲染ejs模版
    resp.render('users', {
        name: req.params.name
    })
})

module.exports = router