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
    // @Req() request: ExpressRequest,
  ) {
    // const token = request.cookies['resetPasswordToken'];
    return this.authenticationService.resetPassword(password, token);
  }
}
