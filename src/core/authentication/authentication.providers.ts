import {
  REFRESH_TOKEN_REPOSITORY,
  RESET_PWD_TOKEN_REPOSITORY,
} from './constants';
import { RefreshToken } from './entities/refresh-token.entity';
import { ResetPasswordToken } from './entities/reset-password-token.entity';

export const authenticationProviders = [
  {
    provide: REFRESH_TOKEN_REPOSITORY,
    useValue: RefreshToken,
  },
  {
    provide: RESET_PWD_TOKEN_REPOSITORY,
    useValue: ResetPasswordToken,
  },
];
