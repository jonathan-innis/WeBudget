import { Controller, Get, Param, Query, Post, Body, Put } from '@nestjs/common';
import { UserService } from './user.service';
import {User, Budget} from './user';

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get()
    async listUsers(): Promise<User[] | null> {
        return await this.userService.listUsers();
    }

    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.userService.createCustomUser(user);
    }

    @Get(':id')
    async getById(@Param() params): Promise<User | null> {
        return await this.userService.getById(params.id);
    }
    @Put(':id')
    async putById(@Param() params, @Body() user: User): Promise<User | null> {
        return await this.userService.putById(params.id, user);
    }

    @Post(':id/budget')
    async createBudget(@Param() params, @Body() budget: Budget): Promise<User | null> {
        return await this.userService.createBudget(params.id, budget);
    }

    @Get(':id/budget')
    async listBudgets(@Param() params): Promise<Budget[] | null> {
        return await this.userService.listBudgets(params.id);
    }

    @Put(':id/budget/:budgetId')
    async putBudget(@Param() params, @Body() budget: Budget): Promise<Budget | null> {
        return await this.userService.putBudgetById(params.id, params.budgetId, budget);
    }

    @Get(':id/budget/:budgetId')
    async getBudget(@Param() params): Promise<Budget | null> {
        return await this.userService.getBudgetById(params.id, params.budgetId);
    }
}
