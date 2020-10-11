import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { TypegooseModule } from 'nestjs-typegoose';
import {User} from './user';

@Module({
  providers: [UserService],
  controllers: [UserController],
  imports: [TypegooseModule.forFeature([User])]
})
export class UserModule {}
