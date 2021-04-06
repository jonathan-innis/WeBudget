const authSecret = process.env.AUTH_SECRET;
const jwt = require('jsonwebtoken');

const authenticateUser = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(401);
    }
    try {
        const user = authenticateToken(authHeader);
        next();
    } catch (err) {
        res.sendStatus(401);
    }
}

const authenticateAdmin = (req, res, next) => {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
        res.sendStatus(401);
    }
    try {
        const user = authenticateToken(authHeader);
        const isAdmin = validateAdmin(user);
        if (!isAdmin) res.sendStatus(401);
        next();
    } catch (err) {
        res.sendStatus(401);
    }
}

const validateAdmin = (userData) => {
    const isAdmin = userData.admin;
    if (isAdmin) return true;
    return false;
}

const authenticateToken = (authHeader) => {
    const token = authHeader.split(' ')[1];
    const user = jwt.verify(token, authSecret);
    console.log(user);
    return user;
}

module.exports = {authenticateUser, authenticateAdmin};