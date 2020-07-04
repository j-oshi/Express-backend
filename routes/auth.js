const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Validation
const { registerValidation, loginValidation } = require('../validation');

// login token
const jwt = require('jsonwebtoken');

// Hash password
const bcrypt = require('bcryptjs');

router.post('/register', async (req, res) => {
    // Validate data posted
    const { error } = registerValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if email exist
    const emailExist = await User.findOne({email: req.body.email});
    if (emailExist) {
        return res.status(400).send('Email already exist.');
    }

    // Hash password
    const salt = await bcrypt.genSaltSync(10);
    var hash = await bcrypt.hashSync(req.body.password, salt);

    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: hash
    });

    try {
        const registerUser = await user.save();
        res.send({user: user._id});
    } catch(err) {
        res.status(400).send(err);
    }
});

router.post('/login', async (req, res) => {
    // Validate data posted
    const { error } = loginValidation(req.body);
    if (error) {
        return res.status(400).send(error.details[0].message);
    }

    // Check if email exist
    const user = await User.findOne({email: req.body.email});
    if (!user) {
        return res.status(400).send('Email or password does not exist.');
    }

    // Check password
    const validPassword = await bcrypt.compareSync(req.body.password, user.password);
    if (!validPassword) {
        return res.status(400).send('Password is invalid.');
    }

    // Create and assign token
    const token = jwt.sign({_id: user._id }, process.env.TOKEN_SECRET);
    res.header('auth-token', token).send(token);
});

module.exports = router;