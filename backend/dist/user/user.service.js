"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const nestjs_typegoose_1 = require("nestjs-typegoose");
const user_1 = require("./user");
let UserService = class UserService {
    constructor(userModel) {
        this.userModel = userModel;
    }
    async createCustomUser(user) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }
    async listUsers() {
        return await this.userModel.find().exec();
    }
    async getById(id) {
        return await this.userModel.findByUserId(id);
    }
    async putById(id, user) {
        return await this.userModel.findOneAndUpdate({ _id: id }, user, { upsert: true, returnNewDocument: true });
    }
    async listBudgets(userId) {
        const user = await this.userModel.findByUserId(userId);
        if (!user || !user.budgets)
            return null;
        return user.budgets;
    }
    async createBudget(userId, budget) {
        const user = await this.userModel.findByUserId(userId);
        return await user.addBudgetAndSave(budget);
    }
    async putBudgetById(userId, budgetId, budget) {
        await this.userModel.updateBudgetById(userId, budgetId, budget);
        return await this.userModel.findByBudgetId(userId, budgetId);
    }
    async getBudgetById(userId, budgetId) {
        await this.userModel.increaseNumAccessed(userId, budgetId);
        return await this.userModel.findByBudgetId(userId, budgetId);
    }
};
UserService = __decorate([
    common_1.Injectable(),
    __param(0, nestjs_typegoose_1.InjectModel(user_1.User)),
    __metadata("design:paramtypes", [Object])
], UserService);
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map