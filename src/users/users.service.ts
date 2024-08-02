import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.model';
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

    const users = await this.userRepository.findAndCountAll(options);

    return users;
  }

  async getById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(createUserDto);

    return user;
  }

  async edit(id: number, updateUserDto: UpdateUserDto) {
    console.log({ updateUserDto });

    const [numberOfAffectedRows, updatedUser] =
      await this.userRepository.update(updateUserDto, {
        where: { id },
        returning: true,
      });

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
