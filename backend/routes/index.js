const { Router } = require('express');
const AccountRouter = require('./account');
const UserRouter = require('./user');
const BudgetRouter = require('./budget');
const router = Router();

router.use('/user/:userId/account', AccountRouter);
router.use('/user/:userId/budget', BudgetRouter);
router.use('/user', UserRouter);

module.exports = router;