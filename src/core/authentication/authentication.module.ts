import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './entities/refresh-token.entity';
import { authenticationProviders } from './authentication.providers';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([RefreshToken])],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    ...authenticationProviders,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
