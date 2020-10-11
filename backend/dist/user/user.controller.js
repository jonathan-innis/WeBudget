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
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const user_1 = require("./user");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async listUsers() {
        return await this.userService.listUsers();
    }
    async create(user) {
        return await this.userService.createCustomUser(user);
    }
    async getById(params) {
        return await this.userService.getById(params.id);
    }
    async putById(params, user) {
        return await this.userService.putById(params.id, user);
    }
    async createBudget(params, budget) {
        return await this.userService.createBudget(params.id, budget);
    }
    async listBudgets(params) {
        return await this.userService.listBudgets(params.id);
    }
    async putBudget(params, budget) {
        return await this.userService.putBudgetById(params.id, params.budgetId, budget);
    }
    async getBudget(params) {
        return await this.userService.getBudgetById(params.id, params.budgetId);
    }
};
__decorate([
    common_1.Get(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listUsers", null);
__decorate([
    common_1.Post(),
    __param(0, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "create", null);
__decorate([
    common_1.Get(':id'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getById", null);
__decorate([
    common_1.Put(':id'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_1.User]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "putById", null);
__decorate([
    common_1.Post(':id/budget'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_1.Budget]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createBudget", null);
__decorate([
    common_1.Get(':id/budget'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "listBudgets", null);
__decorate([
    common_1.Put(':id/budget/:budgetId'),
    __param(0, common_1.Param()), __param(1, common_1.Body()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, user_1.Budget]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "putBudget", null);
__decorate([
    common_1.Get(':id/budget/:budgetId'),
    __param(0, common_1.Param()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "getBudget", null);
UserController = __decorate([
    common_1.Controller('user'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map