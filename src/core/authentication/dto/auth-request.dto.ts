import { Request } from 'express';
import { UserIdentityDto } from 'users/dto/user-identity.dto';

export type AuthRequestDto = { user: UserIdentityDto } & Request;
