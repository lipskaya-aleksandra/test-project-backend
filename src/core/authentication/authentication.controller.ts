import {
  Controller,
  Post,
  Body,
  UseGuards,
  Res,
  Request,
  UnauthorizedException,
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
    @Body() refreshTokenDto: string,
  ) {
    const { accessToken, refreshToken } =
      await this.authenticationService.refreshTokens(refreshTokenDto);

    response.cookie('accessToken', accessToken, { httpOnly: true });
    response.cookie('refreshToken', refreshToken, { httpOnly: true });

    return;
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body('email') email: string) {
    const token = await this.authenticationService.requestPasswordReset(email);
    if (token) {
      return `/password-reset?resetPasswordToken=${token}`;
    }
    throw new UnauthorizedException('Incorrect email provided.');
  }

  @Post('reset-password')
  async resetPassword(
    @Body('password') password: string,
    @Req() request: ExpressRequest,
  ) {
    const token = request.cookies['resetPasswordToken'];
    return this.authenticationService.resetPassword(password, token);
  }
}
