import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './entities/refresh-token.entity';
import { authenticationProviders } from './authentication.providers';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([RefreshToken])],
  controllers: [AuthenticationController],
  providers: [AuthenticationService, ...authenticationProviders],
})
export class AuthenticationModule {}
