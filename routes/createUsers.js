const express = require('express');
const router = express.Router();
const createUser = require('../models/createUser')

router.get('/', (req, res) => {
    res.send('We are on posts')
})

router.post('/createUsers', (req, res) => {
    console.log(req.body)
    res.send('Account created succefull')
})
module.exports = router;