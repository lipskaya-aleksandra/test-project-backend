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
import { REFRESH_TOKEN_REPOSITORY } from './constants';
import { RefreshToken } from './entities/refresh-token.entity';
import { v4 as uuidv4 } from 'uuid';
import { CreationAttributes, Op } from 'sequelize';
import getOffsetDate from 'common/utils/getOffsetDate';
import { RefreshTokenDto } from './dto/refresh-token.dto';
import { omit } from 'lodash';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthenticationService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
    private configService: ConfigService,
    @Inject(REFRESH_TOKEN_REPOSITORY)
    private readonly refreshTokenRepository: typeof RefreshToken,
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

    return omit(user.dataValues, 'password');
  }

  async signIn(userId: number) {
    return await this.createOrUpdateRefreshToken(userId);
  }

  async generateUserTokens(userId: number) {
    const accessToken = this.jwtService.sign({ userId });
    const refreshToken = uuidv4();

    return { accessToken, refreshToken };
  }

  async createOrUpdateRefreshToken(userId: number) {
    const expiryDate = getOffsetDate(
      this.configService.get('REFRESH_TOKEN_EXPIRES_IN') || '3d',
    );

    const { accessToken, refreshToken } = await this.generateUserTokens(userId);

    const [token] = await this.refreshTokenRepository.upsert(
      {
        token: refreshToken,
        userId,
        expiryDate,
      } as CreationAttributes<RefreshToken>,
      { returning: true, conflictWhere: { userId } },
    );

    return { accessToken, refreshToken: token.token };
  }

  async refreshTokens(refreshTokenDto: RefreshTokenDto) {
    const token = await this.refreshTokenRepository.findOne({
      where: {
        token: refreshTokenDto.token,
        expiryDate: {
          [Op.gte]: new Date(),
        },
      },
    });

    if (!token) {
      throw new UnauthorizedException('Refresh token is invalid');
    }

    return await this.createOrUpdateRefreshToken(token.userId);
  }

  async signUp(signUpDto: SignUpDto) {
    const user = await this.usersService.getByEmail(signUpDto.email);
    if (user) {
      throw new ConflictException('Email already in use');
    }
    //signUpDto.password = await argon2.hash(signUpDto.password);
    await this.usersService.create(signUpDto);
  }
}
