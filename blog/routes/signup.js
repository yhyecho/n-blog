const express = require('express')
const router = express.Router()
const path = require('path')
const fs = require('fs')
const sha1 = require('sha1')

const checkNotLogin = require('../middlewares/check').checkNotLogin
const UserModel = require('../models/users') 

// GET /signup 注册页
router.get('/', checkNotLogin, (req, resp, next) => {
    resp.render('signup')
})

// POST /signup  注册Action
router.post('/', checkNotLogin, (req, resp, next) => {
    
    const name = req.fields.name
    let password = req.fields.password
    const repassword = req.fields.repassword
    const gender = req.fields.gender
    const bio = req.fields.bio
    const avatar = req.files.avatar.path.split(path.sep).pop()

    try {
        if (!(name.length >= 1 && name.length <= 10)) {
            throw new Error('名字请限制在1到10个字符！')
        }
        if (['m', 'f', 'x'].indexOf(gender) === -1) {
            throw new Error('性别只能是m, f , x ')
        }
        if (!(bio.length >=1 && bio.length <= 30)) {
            throw new Error('个人简洁请控制在30个字符！')
        }
        if (!req.files.avatar.name) {
            throw new Error('却少头像！')
        }
        if (password <= 6) {
            throw new Error('密码必须在6位以上')
        }
        if (password !== repassword) {
            throw new Error('两次密码不一致')
        }
    } catch(e) {
        fs.unlink(req.files.avatar.path)
        req.flash('error', e.message)
        resp.redirect('/signup')
    }

    password = sha1(password)

    let user = {
        name: name,
        password: password,
        gender: gender,
        bir: bio,
        avatar: avatar
    }

    UserModel.create(user)
    .then((result) => {
        user = result.ops[0]
        delete user.password
        req.session.user = user
        req.flash('success', '注册成功！')
        resp.redirect('/posts')
    })
    .catch((e) => {
        fs.unlink(req.files.avatar.path)
        if (e.message.match('E11000 duplicate key')) {
           req.flash('error', '用户名已被占用！')
           resp.redirect('/signup')
        }
        next(e)
    })

})

module.exports = router