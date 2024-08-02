import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './models/user.model';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './user.providers';
import { Role } from './models/role.model';

@Module({
  imports: [SequelizeModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
