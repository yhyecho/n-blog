const express = require('express')
const router = express.Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin

// GET /signup 注册页
router.get('/', checkNotLogin, (req, resp, next) => {
    resp.render('signup')
})

// POST /signup  注册Action
router.post('/', checkNotLogin, (req, resp, next) => {
    resp.send(req.flash())
})

module.exports = router