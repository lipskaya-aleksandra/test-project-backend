import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { USER_REPOSITORY } from 'common/constants';

import { QueryObj } from 'common/QueryObjType';
import getDbQueryOptions from 'common/getDbQueryOptions';

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
      .scope('withRole')
      .findAndCountAll(options);

    return users;
  }

  async getById(id: number) {
    const user = await this.userRepository.scope('withRole').findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(omit(createUserDto, 'role'));
    await user.setRole(createUserDto.role.id);

    return user;
  }

  async edit(id: number, updateUserDto: UpdateUserDto) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(omit(updateUserDto, 'role'), {
        where: { id },
        returning: true,
      });

    if (updatedUser && updateUserDto.role)
      await updatedUser.setRole(updateUserDto.role.id);

    if (!numberOfAffectedRows) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  async delete(id: number) {
    const user = await this.getById(id);

    await user.destroy();
  }

  async deleteMany(ids: number[]) {
    await this.userRepository.destroy({ where: { id: ids } });
  }
}
