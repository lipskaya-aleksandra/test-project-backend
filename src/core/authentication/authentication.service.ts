import {
  ConflictException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from './dto/sign-in.dto';
import { UsersService } from 'users/users.service';
import * as argon2 from 'argon2';
import { SignUpDto } from './dto/sign-up.dto';
import { JwtService } from '@nestjs/jwt';
import {
  REFRESH_TOKEN_REPOSITORY,
  RESET_PWD_TOKEN_REPOSITORY,
} from './constants';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreationAttributes, Op } from 'sequelize';
import getOffsetDate from 'common/utils/getOffsetDate';
import { ConfigService } from '@nestjs/config';
import { ResetPasswordToken } from './entities/reset-password-token.entity';
import { randomBytes } from 'crypto';
import { EnvVariables } from 'config/envVariables';
import { UserIdentityDto } from 'users/dto/user-identity.dto';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService<EnvVariables, true>,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: typeof RefreshToken,
    @Inject(RESET_PWD_TOKEN_REPOSITORY)
    private readonly resetPasswordTokenRepository: typeof ResetPasswordToken,
  ) {}

  async validateUser(signInDto: SignInDto) {
    const user = await this.usersService.getByEmail(signInDto.email);

    if (!user) {
      return null;
    }

    const isValidPassword = await argon2.verify(
      user.password,
      signInDto.password,
    );

    if (!isValidPassword) {
      return null;
    }

    return user;
  }

  private generateTokenPair(payload: UserIdentityDto) {
    const accessToken = this.jwtService.sign({ id: payload });
    const refreshToken = uuidv4();

    return { accessToken, refreshToken };
  }

  async createUserTokens(payload: UserIdentityDto) {
    const expiryDate = getOffsetDate(
      this.configService.get('REFRESH_TOKEN_EXPIRES_IN', { infer: true }),
    );

    const { accessToken, refreshToken } = this.generateTokenPair(payload);

    const [token] = await this.refreshTokenRepository.upsert(
      {
        token: refreshToken,
        userId: payload.id,
        expiryDate,
      } as CreationAttributes<RefreshToken>,
      { returning: true },
    );

    return { accessToken, refreshToken: token.token };
  }

  async refreshTokens(refreshToken: string) {
    const token = await this.refreshTokenRepository.findOne({
      where: {
        token: refreshToken,
        expiryDate: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return await this.createUserTokens({ id: token.userId });
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.getByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('Email already in use');
    }

    await this.usersService.create(signUpDto);
  }

  async requestPasswordReset(email: string) {
    const user = await this.usersService.getByEmail(email);

    if (!user) {
      return;
    }

    const expiryDate = getOffsetDate(
      this.configService.get('REFRESH_TOKEN_EXPIRES_IN', { infer: true }),
    );

    const resetPasswordToken = randomBytes(256).toString('utf8');
    const [token] = await this.refreshTokenRepository.upsert(
      {
        token: resetPasswordToken,
        userId: user.id,
        expiryDate,
      } as CreationAttributes<RefreshToken>,
      { returning: true, conflictWhere: { userId: user.id } },
    );

    return token.token;
  }

  async resetPassword(password: string, token: string) {
    const resetPasswordToken = await this.resetPasswordTokenRepository.findOne({
      where: {
        token,
        expiryDate: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!resetPasswordToken) {
      throw new UnauthorizedException();
    }

    await this.usersService.editPassword(resetPasswordToken.userId, password);

    await this.resetPasswordTokenRepository.destroy({ where: { token } });
  }
}
