const express = require('express');
const crypto = require('crypto');
const _ = require('underscore');

const User = require('../models');

const router = express.Router();

router.post('/register', async (req, res, next) => {
    try {
        const salt = crypto.randomBytes(16).toString('hex');
        const user = await User.create({
            username: req.body.username,
            email: req.body.email,
            birthday: req.body.birthday,
            salt: salt,
            password: crypto.pbkdf2Sync(req.body.password, salt, 10000, 512, 'sha512').toString('hex')
        })
        const authToken = user.generateJWT()
        let userObj = user.cleanData();
        userObj.token = authToken;

        return res.send(userObj);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body
        if (!username || !password) return res.sendStatus(400);
        const user = await User.findByUsername(username);
        if (!user) {
            return res.sendStatus(404);
        }
        console.log(user);
        const isValidPassword = user.validatePassword(password);
        if (!isValidPassword) {
            return res.sendStatus(401);
        }
        const authToken = user.generateJWT()
        let userObj = user.cleanData();
        userObj.token = authToken;

        return res.send(userObj);

    } catch (err) {
        console.log(err);
        next(err);
    }
})

module.exports = router;