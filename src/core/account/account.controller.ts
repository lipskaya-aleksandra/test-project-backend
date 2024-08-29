import { Controller, Get, Request, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'core/authentication/guards/jwt-auth.guard';
import { AccountService } from './account.service';
import { AuthRequestDto } from 'core/authentication/dto/auth-request.dto';

@Controller('account')
export class AccountController {
  constructor(private readonly accountService: AccountService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  getUserAccount(@Request() request: AuthRequestDto) {
    return this.accountService.getUserAccount(request.user.id);
  }
}
