import { DocumentType, ReturnModelType } from '@typegoose/typegoose';
export declare class LineItem {
    name?: String;
    amountBudgeted?: number;
    amountSpent?: number;
}
export declare class Category {
    name?: String;
    lineItems?: LineItem[];
}
export declare class Budget {
    name?: String;
    categories?: Category[];
    meta: {
        timeCreated?: Date;
        timesUpdated?: number;
        timesAccessed?: number;
    };
}
export declare class User {
    name?: String;
    email?: String;
    password?: String;
    budgets?: Budget[];
    static findByUserId(this: ReturnModelType<typeof User>, userId: number): Promise<any>;
    static findByBudgetId(this: ReturnModelType<typeof Budget>, userId: number, budgetId: number): Promise<any>;
    static increaseNumAccessed(this: ReturnModelType<typeof Budget>, userId: number, budgetId: number): Promise<void>;
    static updateBudgetById(this: ReturnModelType<typeof User>, userId: number, budgetId: number, budget: DocumentType<Budget>): Promise<any>;
    addBudgetAndSave(this: DocumentType<User>, budget: DocumentType<Budget>): Promise<any>;
    async: any;
}
