import { REFRESH_TOKEN_REPOSITORY } from './constants';
import { RefreshToken } from './entities/refresh-token.entity';

export const authenticationProviders = [
  {
    provide: REFRESH_TOKEN_REPOSITORY,
    useValue: RefreshToken,
  },
];
