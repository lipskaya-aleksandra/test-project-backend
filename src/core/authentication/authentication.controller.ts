import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Request,
  Req,
} from '@nestjs/common';
import { AuthenticationService } from './authentication.service';
import { SignUpDto } from './dto/sign-up.dto';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { AuthRequestDto } from './dto/auth-request.dto';
import { Request as ExpressRequest, Response } from 'express';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@Controller('auth')
export class AuthenticationController {
  constructor(private readonly authenticationService: AuthenticationService) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async signIn(
    @Res({ passthrough: true }) response: Response,
    @Request() request: AuthRequestDto,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.createUserTokens(request.user);

    response.cookie('accessToken', accessToken, { httpOnly: true });
    response.cookie('refreshToken', refreshToken, { httpOnly: true });

    return;
  }

  @Post('signup')
  signUp(@Body() signUpDto: SignUpDto) {
    return this.authenticationService.signUp(signUpDto);
  }

  @Post('refresh-tokens')
  async refreshTokens(
    @Res({ passthrough: true }) response: Response,
    @Req() request: ExpressRequest,
  ) {
    const token = request.cookies['refreshToken'];

    const { accessToken, refreshToken } =
      await this.authenticationService.refreshTokens(token);

    response.cookie('accessToken', accessToken, { httpOnly: true });
    response.cookie('refreshToken', refreshToken, { httpOnly: true });

    return;
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    return await this.authenticationService.requestPasswordReset(email);
  }

  @Post('reset-password')
  async resetPassword(
    @Body('password') password: string,
    @Body('resetPasswordToken') token: string,
  ) {
    return this.authenticationService.resetPassword(password, token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('authed-reset-password')
  async authedResetPassword(
    @Body('password') password: string,
    @Request() request: AuthRequestDto,
  ) {
    return this.authenticationService.authedResetPassword(
      password,
      request.user,
    );
  }

  @Post('signout')
  async signOut(
    @Res({ passthrough: true }) response: Response,
    @Req() request: ExpressRequest,
  ) {
    const token = request.cookies['refreshToken'];

    await this.authenticationService.signOut(token);

    response.clearCookie('accessToken', { httpOnly: true });
    response.clearCookie('refreshToken', { httpOnly: true });

    return;
  }
}
