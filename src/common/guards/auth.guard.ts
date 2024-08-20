import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Observable } from 'rxjs';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const token = this.getToken(request);
    if (!token) {
      throw new UnauthorizedException('Invalid roken');
    }
    try {
      this.jwtService.verify(token);
    } catch (e) {
      console.error(e);
      throw new UnauthorizedException('Invalid token');
    }

    return true;
  }

  private getToken(request: Request) {
    return request.headers?.authorization?.split(' ')[1];
  }
}
