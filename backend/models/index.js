const UserSchema = require('./user');
const mongoose = require('mongoose');

module.exports = new mongoose.model('User', UserSchema);