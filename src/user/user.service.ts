import { Injectable } from '@nestjs/common';
import {InjectModel} from 'nestjs-typegoose';
import { User, Budget } from './user';
import {ReturnModelType} from '@typegoose/typegoose';

@Injectable()
export class UserService {
    constructor(@InjectModel(User) private readonly userModel: ReturnModelType<typeof User>) {

    }

    async createCustomUser(user: User) {
        const createdUser = new this.userModel(user);
        return await createdUser.save();
    }

    async listUsers(): Promise<User[] | null> {
        return await this.userModel.find().exec();
    }

    async getById(id: number): Promise<User | null> {
        return await this.userModel.findByUserId(id);
    }

    async putById(id: number, user: User): Promise<User | null> {
        return await this.userModel.findOneAndUpdate({_id: id}, user, {upsert: true, returnNewDocument: true});
    }

    async listBudgets(userId: number): Promise<Budget[] | null> {
        const user = await this.userModel.findByUserId(userId);
        if (!user || !user.budgets) return null;
        return user.budgets;
    }

    async createBudget(userId: number, budget: Budget): Promise<User | null> {
        const user = await this.userModel.findByUserId(userId);
        return await user.addBudgetAndSave(budget);
    }

    async putBudgetById(userId: number, budgetId: number, budget: Budget): Promise<Budget | null> {        
        await this.userModel.updateBudgetById(userId, budgetId, budget);
        return await this.userModel.findByBudgetId(userId, budgetId);
    }

    async getBudgetById(userId: number, budgetId: number): Promise<Budget | null> {
        await this.userModel.increaseNumAccessed(userId, budgetId);
        return await this.userModel.findByBudgetId(userId, budgetId);
    }
}
