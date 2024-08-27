import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthenticationService } from 'core/authentication/authentication.service';
import { plainToInstance } from 'class-transformer';
import { UserIdentityDto } from 'users/dto/user-identity.dto';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthenticationService) {
    super({ usernameField: 'email' });
  }

  async validate(email: string, password: string) {
    const user = await this.authService.validateUser({ email, password });

    if (!user) {
      throw new UnauthorizedException();
    }

    return plainToInstance(UserIdentityDto, user.dataValues);
  }
}
