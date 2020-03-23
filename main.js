const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const AccountCreator = require('./accountCreator')


app.use(bodyParser.json())

app.post('/', async(req, res, next) => {
    console.log(req.body)

    return await res.send(AccountCreator(
        server = req.body.server,
        key = req.body.key,
        howMany = req.body.howMany
    ))
})

app.post('/accountCreator', function (req, res, next) {
    AccountCreator(req.query)()
})

app.listen(8080, function () {
    console.log('Listening!')
})

