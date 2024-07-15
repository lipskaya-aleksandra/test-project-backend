import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
    ) {}
    getAll(paginationQuery: PaginationQueryDto) {
        const { page, perPage } = paginationQuery;
        return this.userRepository.find({
            skip: page * perPage,
            take: perPage,
        });
    }
    async getById(id: string) {
        const user = await this.userRepository.findOneBy({ id: +id });
        if (!user) {
            throw new NotFoundException(`User with id ${id} not found`);
        }
        return user;
    }
    create(createUserDto: CreateUserDto) {
        const user = this.userRepository.create(createUserDto);
        return this.userRepository.save(user);
    }
    async edit(id: string, updateUserDto: UpdateUserDto) {
        const user = await this.userRepository.preload({
            id: +id,
            ...updateUserDto,
        });
        if (!user) {
            throw new NotFoundException('User with id ${id} not found');
        }
        return this.userRepository.save(user);
    }
    async delete(id: string) {
        const user = await this.getById(id);
        return this.userRepository.remove(user);
    }
}
