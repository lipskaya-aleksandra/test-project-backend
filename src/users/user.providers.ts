import { USER_REPOSITORY } from 'common/constants';
import { User } from './models/user.model';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
];
