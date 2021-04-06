const { Router } = require('express');
const AccountRouter = require('./account');
const UserRouter = require('./user');
const BudgetRouter = require('./budget');
const AdminRouter = require('./admin');
const AuthRouter = require('./auth');
const router = Router();
const {authenticateUser, authenticateAdmin} = require('../middleware/auth');

router.use('/user/:userId/account', authenticateUser, AccountRouter);
router.use('/user/:userId/budget', authenticateUser, BudgetRouter);
router.use('/user', authenticateUser, UserRouter);
router.use('/admin', authenticateAdmin, AdminRouter);
router.use('/', AuthRouter);

module.exports = router;