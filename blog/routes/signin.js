const express = require('express')
const router = express.Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin

//GET signin 登录页
router.get('/', checkNotLogin, (req, resp, next) => {
    resp.send(req.flash())
})

// POST sigin 用户登录Action
router.post('/', checkNotLogin, (req, resp, next) => {
    resp.send(req.flash())
})

module.exports = router


