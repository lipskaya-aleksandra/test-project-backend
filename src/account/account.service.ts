import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from 'users/users.service';

@Injectable()
export class AccountService {
  constructor(private readonly usersService: UsersService) {}
  async getUserAccount(id: number) {
    try {
      const user = await this.usersService.getById(id);
      return user;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
}
