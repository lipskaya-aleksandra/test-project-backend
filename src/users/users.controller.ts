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
import { FilterQueryDto } from 'common/dto/filter-query.dto';
import { SortQueryDto } from 'common/dto/sort-query.dto';
import { SortParams } from 'common/decorators/sort-params.decorator';
import { FilterParams } from 'common/decorators/filter-params.decorator';
import { filterableUserProps, sortableUserProps } from './models/user.model';
import { PaginatedOutputUserDto } from './dto/paginated-output-user.dto';
import { WhereOptions } from 'sequelize';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new TransformInterceptor(PaginatedOutputUserDto))
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
    @FilterParams(filterableUserProps)
    filtersWhere?: WhereOptions,
    //filterQueries?: FilterQueryDto[],
    @SortParams(sortableUserProps)
    sortQuery?: SortQueryDto,
    @Query('search') searchTerm?: string,
  ) {
    const users = this.usersService.getAll({
      paginationQuery,
      //filterQueries,
      filtersWhere,
      sortQuery,
      searchTerm,
    });

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

  @Delete()
  deleteManyUsers(@Body() ids: number[]) {
    console.log(ids);
    return this.usersService.deleteMany(ids);
  }
}
