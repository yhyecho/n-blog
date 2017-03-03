module.exports = (app) => {
    app.get('/', (req, resp) => {
        resp.redirect('/posts')
    })

    app.use('/signup', require('./signup'))
    app.use('/signin', require('./signin'))
    app.use('/signout', require('./signout'))
    app.use('/posts', require('./posts'))
}