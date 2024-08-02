import { USER_REPOSITORY, ROLE_REPOSITORY } from 'common/constants';
import { User } from './models/user.model';
import { Role } from './models/role.model';

export const usersProviders = [
  {
    provide: USER_REPOSITORY,
    useValue: User,
  },
  {
    provide: ROLE_REPOSITORY,
    useValue: Role,
  },
];
