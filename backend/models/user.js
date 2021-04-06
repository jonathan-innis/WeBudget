const mongoose = require('mongoose');
const crypto = require('crypto');
const jwt = require('jsonwebtoken');

const authSecret = process.env.AUTH_SECRET;

const accountSchema = require('./account');
const budgetSchema = require('./budget');

const userSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
        },
        password: {
            type: String,
            required: true,
        },
        email: {
            type: String,
            unique: true,
            required: true,
        },
        birthday: {
            type: String,
            required: true,
        },
        salt: {
            type: String,
            required: true,
        },
        admin: {
            type: Boolean,
            default: false
        },
        accounts: [accountSchema],
        budgets: [budgetSchema]
    },
    { timestamps: true },
)

userSchema.statics.findByUsername = async function (username) {
    let user = await this.findOne({
        username: username,
    });
    return user;
}

userSchema.methods.findBudgetByName = async function(budgetName) {
    const user = await mongoose.model('User').findOne({'budgets.name': budgetName}, {'budgets.$': 1});
    if (!user) return null;
    return user.budgets[0];
}

userSchema.methods.setPassword = function(password) {
    this.salt = crypto.randomBytes(16).toString('hex');
    this.password = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
}

userSchema.methods.validatePassword = function(password) {
    const hash = crypto.pbkdf2Sync(password, this.salt, 10000, 512, 'sha512').toString('hex');
    console.log(password, this.salt);
    console.log(hash, this.password)
    return this.password == hash;
}

userSchema.methods.cleanData = function() {
    const userObj = this.toObject();
    delete userObj.password;
    delete userObj.salt;
    
    return userObj;
}

userSchema.methods.generateJWT = function() {
    const today = new Date();
    const expirationDate = new Date(today);
    expirationDate.setDate(today.getDate() + 7);

    return jwt.sign({
        email: this.email,
        id: this._id,
        admin: this.admin,
        exp: parseInt(expirationDate.getTime() / 1000, 10)
    }, authSecret);
}

module.exports = userSchema;