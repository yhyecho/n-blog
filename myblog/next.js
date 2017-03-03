const express = require('express')
const app = express()

app.use((req, resp, next) => {
    console.log('1')
    next() // 传递请求到下一个middleware
    // next(new Error('throw a RuntimeException'))
})

app.use((req, resp, next) => {
    console.log('2')
    resp.status(200).end()
})
// 使用自定义的错误处理
app.use((err, req, resp, next) => {
    console.error(err.stack)
    resp.status(500).send('Something broke!')
})

app.listen(3000, () => {
    console.log('server on 3000')
})