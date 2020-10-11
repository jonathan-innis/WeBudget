import { User, Budget } from './user';
import { ReturnModelType } from '@typegoose/typegoose';
export declare class UserService {
    private readonly userModel;
    constructor(userModel: ReturnModelType<typeof User>);
    createCustomUser(user: User): Promise<any>;
    listUsers(): Promise<User[] | null>;
    getById(id: number): Promise<User | null>;
    putById(id: number, user: User): Promise<User | null>;
    listBudgets(userId: number): Promise<Budget[] | null>;
    createBudget(userId: number, budget: Budget): Promise<User | null>;
    putBudgetById(userId: number, budgetId: number, budget: Budget): Promise<Budget | null>;
    getBudgetById(userId: number, budgetId: number): Promise<Budget | null>;
}
