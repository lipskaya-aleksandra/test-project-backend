import {
  ConflictException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { omit } from 'lodash';
import { User } from './entities/user.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserJobDto } from 'jobs/dto/update-user-job.dto';
import { USER_REPOSITORY } from './constants';
import { CreationAttributes } from 'sequelize';
import { UserQueryDto } from './dto/user-query-dto';
import * as argon2 from 'argon2';
import { JobsService } from 'jobs/jobs.service';

@Injectable()
export class UsersService {
  constructor(
    @Inject(USER_REPOSITORY) private readonly userRepository: typeof User,
    private readonly jobsService: JobsService,
  ) {}

  async getAll(query: UserQueryDto) {
    const { scopes, queryOptions } = query.getDbQueryOptions();

    const users = await this.userRepository
      .scope([...scopes, 'withJob'])
      .findAndCountAll({ ...queryOptions, logging: true });

    return users;
  }

  async getById(id: number) {
    const user = await this.userRepository.scope('withJob').findByPk(id);

    if (!user) {
      throw new NotFoundException(`User not found`);
    }

    return user;
  }

  async getByEmail(email: string) {
    const user = await this.userRepository.findOne({ where: { email } });

    return user;
  }

  async create(createUserDto: CreateUserDto) {
    const existingUser = await this.getByEmail(createUserDto.email);
    if (existingUser) {
      throw new ConflictException('Email already in use');
    }

    if (createUserDto.password) {
      createUserDto.password = await argon2.hash(createUserDto.password);
    }

    const user = await this.userRepository.create(
      omit(createUserDto, 'jobId') as CreationAttributes<User>,
    );

    await user.setJob(createUserDto?.jobId ?? null);

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

    if (updateUserDto.jobId)
      await this._editJob(updateUserDto.jobId ?? null, updatedUser);

    return updatedUser;
  }

  private async _editJob(id: number | null, user: User) {
    if (id) {
      try {
        await this.jobsService.findById(id);
      } catch (e) {
        throw new NotFoundException('Wrong job id provided');
      }
    }

    await user.setJob(id);
  }

  async editJob(id: number, updateUserJobDto: UpdateUserJobDto) {
    const user = await this.getById(id);
    await this._editJob(updateUserJobDto.id, user);

    return user;
  }

  async editPassword(id: number, password: string) {
    const user = await this.getById(id);
    const hashedPassword = await argon2.hash(password);
    await user.update({ password: hashedPassword });
  }

  async delete(id: number) {
    const user = await this.getById(id);

    await user.destroy();
  }

  async deleteMany(ids: number[]) {
    await this.userRepository.destroy({ where: { id: ids } });
  }
}
