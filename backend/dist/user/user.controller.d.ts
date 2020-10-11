import { UserService } from './user.service';
import { User, Budget } from './user';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    listUsers(): Promise<User[] | null>;
    create(user: User): Promise<User>;
    getById(params: any): Promise<User | null>;
    putById(params: any, user: User): Promise<User | null>;
    createBudget(params: any, budget: Budget): Promise<User | null>;
    listBudgets(params: any): Promise<Budget[] | null>;
    putBudget(params: any, budget: Budget): Promise<Budget | null>;
    getBudget(params: any): Promise<Budget | null>;
}
