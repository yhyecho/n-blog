const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin

// GET signout 登出
router.get('/', checkLogin, (req, resp, next) => {
    req.session.user = null
    req.flash("success", "登出成功")
    resp.redirect('posts')
})

module.exports = router