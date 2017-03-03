const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET signout 登出
router.get('/', checkLogin, (req, resp, next) => {
    resp.send(req.flash())
})

module.exports = router