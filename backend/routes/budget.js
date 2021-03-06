const express = require('express');
const User = require('../models');
const Budget = require('../models/budget');
const { NotFound } = require('../utils/errors');

const router = express.Router({mergeParams: true});

router.get('/', async (req, res, next) => {
    try {
        const {userId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound("unable to find user specified");
        }
        return res.send(user.budgets);
    } catch (err) {
        next(err);
    }
});

router.get('/:budgetId', async  (req, res, next) => {
    try {
        const {userId, budgetId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound(`unable to find the user with the user id ${userId}`);
        }
        const budget = user.budgets.id(budgetId);
        if (!budget) {
            throw new NotFound(`unable to find the budget for user ${userId} with budgetId ${budgetId}`);
        }
        return res.send(budget);
    } catch (err) {
        next(err);
    }
});

router.post('/', async (req, res, next) => {
    try {
        let budget = {
            name: req.body.name,
        }

        const {userId} = req.params;
        const user = await User.findById(userId);
        if (!user) {
            throw new NotFound(`unable to find the user with the user id ${userId}`);
        }
        user.budgets.push(budget);
        await user.save();
        res.send(user);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.put('/:budgetId', async (req, res, next) => {
    try {
        const {userId, budgetId} = req.params;

        const user = await User.findById(userId);
        const budget = await user.budgets.id(budgetId);

        budget.set(req.body);
        const savedUser = await user.save();
        console.log(savedUser);
        const savedBudget = await savedUser.budgets.id(budgetId);
        res.send(savedBudget);
    } catch (err) {
        next(err);
    }
});

router.delete('/:budgetId', async (req, res, next) => {
    try {
        const {userId, budgetId} = req.params;

        await User.findByIdAndUpdate(userId, {
            '$pull': {
                'budgets': { '_id': budgetId }
            }
        });
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

module.exports = router;