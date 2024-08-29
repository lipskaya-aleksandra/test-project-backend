import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserIdentityDto } from 'users/dto/user-identity.dto';
import { ConfigService } from '@nestjs/config';
import { EnvVariables } from 'config/envVariables';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['accessToken'];
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private configService: ConfigService<EnvVariables, true>) {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: configService.get('JWT_SECRET'),
    });
  }

  async validate(payload: UserIdentityDto) {
    return payload;
  }
}
