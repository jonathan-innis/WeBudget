import { prop, DocumentType, ReturnModelType } from '@typegoose/typegoose';
import { IsEmail, IsNotEmpty, IsEmpty, ValidateNested, IsNumber, IsString } from 'class-validator';
import { Type } from 'class-transformer';

export class LineItem {
    @IsNotEmpty()
    @IsString()
    @prop({required: true})
    name?: String;

    @IsNotEmpty()
    @IsNumber()
    @prop({required: true})
    amountBudgeted?: number;

    @IsNotEmpty()
    @IsNumber()
    @prop({required: true})
    amountSpent?: number;
}

export class Category {
    @IsNotEmpty()
    @IsString()
    @prop({required: true})
    name?: String;
    
    @ValidateNested({ each: true })
    @Type(() => LineItem)
    @prop({type: [LineItem]})
    lineItems?: LineItem[];
}

export class Budget {
    @IsNotEmpty()
    @IsString()
    @prop({required: true})
    name?: String;

    @ValidateNested({ each: true })
    @Type(() => Category)
    @prop({type: [Category], required: true })
    categories?: Category[];

    @IsEmpty()
    @prop({required: true})
    meta: {
        timeCreated?: Date;
        timesUpdated?: number;
        timesAccessed?: number;
    }
}

export class User {
    @IsNotEmpty()
    @IsString()
    @prop({required: true})
    name?: String;

    @IsEmail()
    @IsString()
    @IsNotEmpty()
    @prop({required: true})
    email?: String;

    @IsString()
    @IsNotEmpty()
    @prop({required: true})
    password?: String;

    @ValidateNested({ each: true })
    @Type(() => Budget)
    @prop({type: [Budget], required: true })
    budgets?: Budget[];

    public static async findByUserId(this: ReturnModelType<typeof User>, userId: number) {
        return this.findOne({_id: userId}).exec();
    }

    public static async findByBudgetId(this: ReturnModelType<typeof Budget>, userId: number, budgetId: number) {
        const result = await this.findOne({_id: userId, 'budgets._id': budgetId}, {'budgets.$': 1}).exec();
        if (!result || !result.budgets || result.budgets.length == 0) return null;
        return result.budgets[0];
    }

    public static async increaseNumAccessed(this: ReturnModelType<typeof Budget>, userId: number, budgetId: number) {
        await this.findOneAndUpdate({_id: userId, 'budgets._id': budgetId}, {'$inc': {'budgets.$.meta.timesAccessed': 1}}).exec();
    }

    public static async updateBudgetById(this: ReturnModelType<typeof User>, userId: number, budgetId: number, budget: DocumentType<Budget>) {
        const oldBudget = await this.findByBudgetId(userId, budgetId);
        budget._id = oldBudget._id
        budget.meta = oldBudget.meta
        budget.meta.timesUpdated += 1
        return await this.findOneAndUpdate({_id: userId, 'budgets._id': budgetId}, {'$set': {'budgets.$': budget}}, {new: true}).exec();
    } 

    public async addBudgetAndSave(this: DocumentType<User>, budget: DocumentType<Budget>) {
        budget.meta = {
            timeCreated: new Date(),
            timesAccessed: 0,
            timesUpdated: 0
        };
        this.budgets.push(budget);
        return await this.save();
    }

    public async 
}