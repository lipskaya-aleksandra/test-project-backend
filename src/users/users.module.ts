import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { User } from './entities/user.entity';
import { SequelizeModule } from '@nestjs/sequelize';
import { usersProviders } from './user.providers';
import { Job } from 'jobs/entities/job.entity';

@Module({
  imports: [SequelizeModule.forFeature([User, Job])],
  controllers: [UsersController],
  providers: [UsersService, ...usersProviders],
  exports: [UsersService],
})
export class UsersModule {}
