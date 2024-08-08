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
import { SortQueryDto } from 'common/dto/sort-query.dto';
import { SortParams } from 'common/decorators/sort-params.decorator';
import { FilterParams } from 'common/decorators/filter-params.decorator';
import {
  filterableUserProps,
  referenceFilterParamsMap,
  sortableUserProps,
} from './entities/user.entity';
import { PaginatedOutputUserDto } from './dto/paginated-output-user.dto';
import { WhereOptions } from 'sequelize';
import { UpdateUserJobDto } from 'jobs/dto/update-user-job.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new TransformInterceptor(PaginatedOutputUserDto))
  @Get()
  getAll(
    @Query() paginationQuery: PaginationQueryDto,
    @FilterParams({
      validParams: filterableUserProps,
      referenceParamsMap: referenceFilterParamsMap,
    })
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
  async getUserById(@Param('id', ParseIntPipe) id: number) {
    const user = await this.usersService.getById(id);

    return user;
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
  @Patch(':id/role')
  editUserRole(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserRoleDto: UpdateUserJobDto,
  ) {
    return this.usersService.editJob(id, updateUserRoleDto);
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
