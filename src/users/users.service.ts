import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { User } from './models/user.model';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { USER_REPOSITORY } from 'common/constants';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  getAll(paginationQuery: PaginationQueryDto) {
    const { page, perPage } = paginationQuery;

    const users = this.userRepository.findAll({
      offset: (page - 1) * perPage,
      limit: perPage,
    });

    return users;
  }

  async getById(id: number) {
    const user = await this.userRepository.findByPk(id);
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    return user;
  }

  create(createUserDto: CreateUserDto) {
    const user = this.userRepository.create(createUserDto);
    return user;
  }

  async edit(id: number, updateUserDto: UpdateUserDto) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(updateUserDto, {
        where: { id },
        returning: true,
      });

    if (numberOfAffectedRows === 0) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    return updatedUser;
  }

  async delete(id: number) {
    const user = await this.getById(id);

    await user.destroy();
  }
}
