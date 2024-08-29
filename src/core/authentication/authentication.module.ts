import { Module } from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { AuthenticationController } from './authentication.controller';
import { UsersModule } from 'users/users.module';
import { SequelizeModule } from '@nestjs/sequelize';
import { RefreshToken } from './entities/refresh-token.entity';
import { authenticationProviders } from './authentication.providers';
import { LocalStrategy } from './strategies/local.strategy';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ResetPasswordToken } from './entities/reset-password-token.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    UsersModule,
    ConfigModule,
    SequelizeModule.forFeature([RefreshToken, ResetPasswordToken]),
  ],
  controllers: [AuthenticationController],
  providers: [
    AuthenticationService,
    ...authenticationProviders,
    LocalStrategy,
    JwtStrategy,
  ],
})
export class AuthenticationModule {}
