const express = require('express');
const { Error } = require('mongoose');
const User = require('../models');
const { BadRequest, NotFound } = require('../utils/errors');

const router = express.Router();

router.get('/:userId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        if (!userId) {
            throw BadRequest(`No user id was provided`);
        }
        const user = await User.findById(
            userId,
        )
        if (!user) {
            throw NotFound(`Unable to find user with user id ${userId}`);
        }
        return res.send(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

router.post('/', async(req, res, next) => {
    try{
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            email: req.body.email,
            birthday: req.body.birthday
        });
        return res.send(user);
    } catch (err) {
        if (err instanceof Error.ValidationError) {
            next(new BadRequest(err.message));
        }
        console.log(err);
        next(err);
    }
});

module.exports = router;