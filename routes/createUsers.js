const express = require('express');
const router = express.Router();
const CreateUser = require('../models/createUser')


// Get back all accounts
router.get('/createUsers', async (req, res) => {
    try {
        const createUsers = await CreateUser.find()
        res.json(createUsers)
    } catch (error) {
        res.json({ message: error })
    }
})

//Add new account
router.post('/createUsers', async (req, res) => {
    const createUser = new CreateUser({
        username: req.body.username,
        password: req.body.password,
    });
    try {
        const savedCreateUser = await createUser.save()
        res.status(200)
        res.json(data)
    }
    catch (error) {
        res.status(404)
        res.json({
            message: error
        });
    }
});

module.exports = router;