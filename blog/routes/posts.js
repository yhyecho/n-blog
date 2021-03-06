const express = require('express')
const router = express.Router()
const checkLogin = require('../middlewares/check').checkLogin
const PostModel = require('../models/posts')

// GET /posts 所有用户,或特定用户的文章页
// eg: GET /post?author=xxx
router.get('/', (req, resp, next) => {
    const author = req.query.author

    PostModel.getPosts(author)
        .then((posts) => {
            resp.render('posts', {
                posts: posts
            })
        })
        .catch(next)
})

// GET /posts/create 发表文章页
router.get('/create', checkLogin, (req, resp, next) => {
    resp.render('create')
})

// POST /posts 发表一篇文章Action
router.post('/', checkLogin, (req, resp, next) => {
    const author = req.session.user._id
    const title = req.fields.title
    const content = req.fields.content

    try {
        if (!title.length) {
        throw new Error('请填写标题')
        }

        if (!content.length) {
            throw new Error('请填写内容')
        }
    } catch(e) {
        req.flash('error', e.message)
        return resp.redirect('back')
    }

    let post = {
        author: author,
        title: title,
        content: content,
        pv: 0
    }

    PostModel.create(post)
    .then((result) => {
       post = result.ops[0]
       req.flash('success', '发表成功')
       resp.redirect(`/posts/${post._id}`)
    })
    .catch(next)
})

// GET /posts/:postId 单独一篇文章页
router.get('/:postId', (req, resp, next) => {
    const postId = req.params.postId

    Promise.all([
        PostModel.getPostById(postId),
        PostModel.incPv(postId)
    ])
    .then((result) => {
        const post = result[0]
        if (!post) {
            throw new Error('该文章不存在')
        }

        resp.render('post', {
            post: post
        })
    })
    .catch(next)
})

// GET /posts/:postId/edit 更新文章页面
router.get('/:postId/edit', checkLogin, (req, resp, next) => {
    resp.send(req.flash())
})

// POST /posts/:postId/edit 更新文章Action
router.post('/:postId/edit', checkLogin, (req, resp, next) => {
    resp.send(req.flash())
})

// GET /posts/:postId/remove 删除一篇文章
router.get('/:postId/remove', checkLogin, (req, resp, next) => {
    resp.send(req.flash())
})

// POST /posts/:postId/comment 创建一条留言
router.post('/:postId/comment', checkLogin, (req, resp, next) => {
    resp.send(req.flash())
})

// GET /posts/:postId/comment/:commentId/remove 删除一条留言
router.get('/:postId/comment/:commentId/remove', checkLogin, (req, resp, next) => {
    resp.send(req.flash())
})

module.exports = router