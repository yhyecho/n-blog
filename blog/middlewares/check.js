module.exports = {
    checkLogin: (req, resp, next) => {
        if (!req.session.user) {
            req.flash('error', '未登录')
            return resp.redirect('/signin')
        }
        next()
    },

    checkNotLogin: (req, resp, next) => {
        if (req.session.user) {
            req.flash('error', '已登录')
            return resp.redirect('back') // 返回之前的页面
        }
        next()
    }
}