import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'common/constants';

import { QueryObj } from 'common/QueryObjType';
import getDbQueryOptions from 'common/getDbQueryOptions';
import { UpdateUserJobDto } from 'jobs/dto/update-user-job.dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async getAll(query: QueryObj) {
    const options = getDbQueryOptions(query, [
      'firstName',
      'lastName',
      'email',
    ]);

    console.log(options);

    const users = await this.userRepository
      .scope('withJob')
      .findAndCountAll(options);

    return users;
  }

  async getById(id: number) {
    const user = await this.userRepository.scope('withJob').findByPk(id);

    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(omit(createUserDto, 'job'));
    await user.setJob(createUserDto.job.id);

    return user;
  }

  async edit(id: number, updateUserDto: UpdateUserDto) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(omit(updateUserDto, 'job'), {
        where: { id },
        returning: true,
      });

    if (updatedUser && updateUserDto.job)
      await updatedUser.setJob(updateUserDto.job.id);

    if (!numberOfAffectedRows) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  async editJob(id: number, updateUserJobDto: UpdateUserJobDto) {
    const user = await this.getById(id);
    await user.setJob(updateUserJobDto.id);

    return user;
  }

  async delete(id: number) {
    const user = await this.getById(id);

    await user.destroy();
  }

  async deleteMany(ids: number[]) {
    await this.userRepository.destroy({ where: { id: ids } });
  }
}
