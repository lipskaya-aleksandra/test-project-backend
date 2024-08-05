import { Inject, Injectable } from '@nestjs/common';
import { ROLE_REPOSITORY } from 'common/constants';
import { Role } from './entities/role.entity';

@Injectable()
export class RolesService {
  constructor(
    @Inject(ROLE_REPOSITORY) private readonly roleRepository: typeof Role,
  ) {}

  async findAll() {
    return await this.roleRepository.findAll();
  }
}
