const express = require('express')
const router = express.Router()
const checkNotLogin = require('../middlewares/check').checkNotLogin
const sha1 = require('sha1')

const UserModel = require('../models/users')

//GET signin 登录页
router.get('/', checkNotLogin, (req, resp, next) => {
    resp.render('signin')
})

// POST sigin 用户登录Action
router.post('/', checkNotLogin, (req, resp, next) => {
    const name = req.fields.name
    const password = req.fields.password

    UserModel.getUserByName(name)
    .then((user) => {
        if (!user) {
            req.flash('error', '用户不存在')
            return resp.redirect('back')
        }

        if (sha1(password) !== user.password) {
            req.flash('error', '用户名或密码错误！')
            return resp.redirect('back')
        }
        
        req.flash('success', '登陆成功')
        delete user.password
        req.session.user = user
        resp.redirect('/posts')
    })
    .catch(next)
})

module.exports = router


