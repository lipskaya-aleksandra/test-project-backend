import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'common/dto/pagination-query.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { TransformInterceptor } from '../common/interceptors/plain-to-class.interceptor';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new TransformInterceptor(OutputUserDto))
  @Get()
  getAll(@Query() paginationQuery: PaginationQueryDto) {
    const users = this.usersService.getAll(paginationQuery);

    return users;
  }

  @UseInterceptors(new TransformInterceptor(OutputUserDto))
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.getById(id);
  }

  @UseInterceptors(new TransformInterceptor(OutputUserDto))
  @Post()
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @UseInterceptors(new TransformInterceptor(OutputUserDto))
  @Patch(':id')
  editUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.usersService.edit(id, updateUserDto);
  }

  @UseInterceptors(new TransformInterceptor(OutputUserDto))
  @Delete(':id')
  deleteUser(@Param('id', ParseIntPipe) id: number) {
    return this.usersService.delete(id);
  }
}
