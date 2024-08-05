import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './user.providers';
import { Role } from '../roles/entities/role.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Role])],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
})
export class UsersModule {}
