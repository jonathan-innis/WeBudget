const express = require('express');
const User = require('../models');
const { NotFound } = require('../utils/errors');

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound("unable to find user specified");
        }
        return res.send(user.accounts);
    } catch (err) {
        next(err);
    }
});

router.get('/:accountId', async (req, res, next) => {
    try {
        const userId = req.params.userId;
        const user = await User.findById(req.params.userId);
        if (!user) {
            throw new NotFound("unable to find user specified");
        }
        const account = user.accounts.id(req.params.accountId);
        if (!account) {
            throw new NotFound("cannot find account for user");
        }
        return res.send(user.accounts.id(req.params.accountId));
    } catch (err) {
        next(err);
    }
});

router.put('/', async (req, res, next) => {
    try{
        const account = await Account.create({
            name: req.body.name,
            type: req.body.type,
            accountValue: req.body.accountValue,
            user: req.body.user
        });
        return res.send(account);
    } catch (err) {
        next(err);
    }
});

module.exports = router;