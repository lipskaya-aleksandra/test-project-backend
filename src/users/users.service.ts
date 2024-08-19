import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { omit } from 'lodash';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

// import { QueryDto } from 'common/dto/query.dto';
//import getDbQueryOptions from 'common/getDbQueryOptions';
import { UpdateUserJobDto } from 'jobs/dto/update-user-job.dto';
import { USER_REPOSITORY } from './constants';
import { CreationAttributes } from 'sequelize';
import { UserQueryDto } from './dto/user-query-dto';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
  ) {}

  async getAll(query: UserQueryDto) {
    const { scopes, queryOptions } = query.getDbQueryOptions();

    const users = await this.userRepository
      .scope(scopes)
      .findAndCountAll(queryOptions);

    return users;
  }

  async getById(id: number) {
    const user = await this.userRepository.scope('withJob').findByPk(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const user = await this.userRepository.create(
      omit(createUserDto, 'job') as CreationAttributes<User>,
    );
    await user.setJob(createUserDto.job?.id ?? null);

    return user;
  }

  async edit(id: number, updateUserDto: UpdateUserDto) {
    const [numberOfAffectedRows, [updatedUser]] =
      await this.userRepository.update(
        { email: updateUserDto.email },
        {
          where: { id },
          returning: true,
        },
      );

    if (!numberOfAffectedRows) {
      throw new NotFoundException(`User not found`);
    }

    if (updateUserDto.job)
      await this._editJob(updateUserDto.job?.id ?? null, updatedUser);

    return updatedUser;
  }

  private async _editJob(id: number | null, user: User) {
    await user.setJob(id);
  }

  async editJob(id: number, updateUserJobDto: UpdateUserJobDto) {
    const user = await this.getById(id);
    await this._editJob(updateUserJobDto.id, user);

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
