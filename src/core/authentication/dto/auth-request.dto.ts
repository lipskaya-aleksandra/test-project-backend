import { OmitType } from '@nestjs/mapped-types';
import { Request } from 'express';
import { User } from 'users/entities/user.entity';

export class RequestUserDto extends OmitType(User, ['password']) {}

export type AuthRequestDto = { user: RequestUserDto } & Request;
