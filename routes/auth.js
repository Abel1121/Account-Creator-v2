const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken')
const { registerValidation, loginValidation }= require('../validation.js');

//Register
router.post('/register', async (req, res) => {

        //Validate data before we a user
    const { error } = registerValidation(req.body); // this lane validate body
    if ( error ) return res.status(400).send(error.details[0].message) //what is wrong 

        //checking if the user already exist
    const emailExist = await User.findOne({email: req.body.email})
    if (emailExist) return res.status(400).send('Email already exists');

        // HASHing the paswword
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    
    const user = new User({
        username: req.body.username,
        email: req.body.email,
        password: hashedPassword
    })
    try { 
        const savedUser = await user.save();
        res.send(savedUser);
    }catch (err) {
        res.status(400).send(err);
    }
})

//Login
router.post('/login', async (req, res) => {

     const { error } = loginValidation(req.body); // this lane validate body
    if (error) return res.status(400).send(error.details[0].message);
    
       //checking if the email already exist
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send('Email not found');

        //Pasword is Correct
    const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword) return res.status(400).send('Invalid Password');
    
        //Create a JWT
    // const token = jwt.sign({_id: user._id})

    res.send('Login is correct')
})

module.exports = router;