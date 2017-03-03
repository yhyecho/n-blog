const express = require('express')
const app = express()

app.get('/', (req, res) => {
    res.send('Hello Express2')
})

app.listen(3000, () => {
    console.log('serve on 3000')
})