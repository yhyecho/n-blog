const express = require('express')
const app = express()
const indexRouter = require('./routes/index')
const userRouter = require('./routes/users')

app.use('/', indexRouter)
app.use('/users', userRouter)

app.listen(3000, () => {
    console.log('server on 3000')
})