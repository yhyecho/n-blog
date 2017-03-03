const express = require('express')
const path = require('path')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log('server on 3000')
})