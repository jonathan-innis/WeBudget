const express = require('express');
const router = express.Router();
const User = require('../../models');

router.get('/', async (req, res, next) => {
    try {
        const users = await User.find();
        return res.send(users);
    } catch (err) {
        console.log(err);
        next(err);
    }
});

router.delete('/:userId', async(req, res, next) => {
    try {
        const {userId} = req.params;
        await User.deleteOne({'_id': userId});
        res.sendStatus(200);
    } catch (err) {
        console.log(err);
        next(err);
    }
})

module.exports = router;