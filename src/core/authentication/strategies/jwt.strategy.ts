import { Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';
import { UserIdentityDto } from 'users/dto/user-identity.dto';

function cookieExtractor(req: Request) {
  if (req && req.cookies) {
    return req.cookies['accessToken'];
  }
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: cookieExtractor,
      ignoreExpiration: false,
      secretOrKey: process.env.JWT_SECRET, // can it be accessed with configService?
    });
  }

  async validate(payload: UserIdentityDto) {
    return payload;
  }
}
