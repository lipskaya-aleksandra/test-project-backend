import { Module } from '@nestjs/common';
import { AccountService } from './account.service';
import { UsersModule } from 'users/users.module';
import { AccountController } from './account.controller';
import { JwtStrategy } from 'core/authentication/strategies/jwt.strategy';

@Module({
  imports: [UsersModule],
  controllers: [AccountController],
  providers: [AccountService, JwtStrategy],
})
export class AccountModule {}
