const express = require('express');
const app = express()
const bodyParser = require('body-parser')
const AccountCreator = require('./accountCreator')
const mongoose = require('mongoose')
require('dotenv/config')

app.use(bodyParser.json())


// app.post('/', async(req, res, next) => {
//     console.log(req.body)

//     const result = await AccountCreator(
//         server = req.body.server,
//         key = req.body.key,
//         howMany = req.body.howMany,
//     )
//     await console.log(result, "result")
// })
//Import Routers
const createAccount = require('./routes/createAccunt')

app.use('/', createAccount);

app.get('/', (req,res) => {
    res.send('You are in home')
});

// Connect to DB
mongoose.connect(
    process.env.DB_connection,
    {
        useUnifiedTopology: true,
        useNewUrlParser: true,
    }
)
    .then(console.log('MongoDB Connected'))
    .catch((err) => console.log(`MongoDB error is ${err}`))


app.listen(8080, function () {
    console.log('Listening!')
})

