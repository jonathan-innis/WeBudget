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
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Budget = exports.Category = exports.LineItem = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const class_validator_1 = require("class-validator");
const class_transformer_1 = require("class-transformer");
class LineItem {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], LineItem.prototype, "name", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], LineItem.prototype, "amountBudgeted", void 0);
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsNumber(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Number)
], LineItem.prototype, "amountSpent", void 0);
exports.LineItem = LineItem;
class Category {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Category.prototype, "name", void 0);
__decorate([
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => LineItem),
    typegoose_1.prop({ type: [LineItem] }),
    __metadata("design:type", Array)
], Category.prototype, "lineItems", void 0);
exports.Category = Category;
class Budget {
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Budget.prototype, "name", void 0);
__decorate([
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Category),
    typegoose_1.prop({ type: [Category], required: true }),
    __metadata("design:type", Array)
], Budget.prototype, "categories", void 0);
__decorate([
    class_validator_1.IsEmpty(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Object)
], Budget.prototype, "meta", void 0);
exports.Budget = Budget;
class User {
    static async findByUserId(userId) {
        return this.findOne({ _id: userId }).exec();
    }
    static async findByBudgetId(userId, budgetId) {
        const result = await this.findOne({ _id: userId, 'budgets._id': budgetId }, { 'budgets.$': 1 }).exec();
        if (!result || !result.budgets || result.budgets.length == 0)
            return null;
        return result.budgets[0];
    }
    static async increaseNumAccessed(userId, budgetId) {
        await this.findOneAndUpdate({ _id: userId, 'budgets._id': budgetId }, { '$inc': { 'budgets.$.meta.timesAccessed': 1 } }).exec();
    }
    static async updateBudgetById(userId, budgetId, budget) {
        const oldBudget = await this.findByBudgetId(userId, budgetId);
        budget._id = oldBudget._id;
        budget.meta = oldBudget.meta;
        budget.meta.timesUpdated += 1;
        return await this.findOneAndUpdate({ _id: userId, 'budgets._id': budgetId }, { '$set': { 'budgets.$': budget } }, { new: true }).exec();
    }
    async addBudgetAndSave(budget) {
        budget.meta = {
            timeCreated: new Date(),
            timesAccessed: 0,
            timesUpdated: 0
        };
        this.budgets.push(budget);
        return await this.save();
    }
}
__decorate([
    class_validator_1.IsNotEmpty(),
    class_validator_1.IsString(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    class_validator_1.IsEmail(),
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    class_validator_1.IsString(),
    class_validator_1.IsNotEmpty(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    class_validator_1.ValidateNested({ each: true }),
    class_transformer_1.Type(() => Budget),
    typegoose_1.prop({ type: [Budget], required: true }),
    __metadata("design:type", Array)
], User.prototype, "budgets", void 0);
exports.User = User;
//# sourceMappingURL=user.js.map