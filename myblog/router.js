const express = require('express')
const app = express()

app.get('/', (req, resp) => {
    resp.send('Hello express')
})

app.get('/users/:name', (req, resp) => {
    resp.send(`Hello ${req.params.name}`)
})

app.listen(3000, () => {
    console.log('server on 3000')
})