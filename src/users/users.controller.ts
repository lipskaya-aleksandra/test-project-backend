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
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { OutputUserDto } from './dto/output-user.dto';
import { TransformInterceptor } from '../common/interceptors/plain-to-class.interceptor';
import { PaginatedOutputUserDto } from './dto/paginated-output-user.dto';
import { UpdateUserJobDto } from 'jobs/dto/update-user-job.dto';
import { UserQueryDto } from './dto/user-query-dto';
import { JwtAuthGuard } from 'core/authentication/guards/jwt-auth.guard';

@UseGuards(JwtAuthGuard)
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseInterceptors(new TransformInterceptor(PaginatedOutputUserDto))
  @Get()
  getAll(@Query() query: UserQueryDto) {
    const users = this.usersService.getAll(query);

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
  @Patch(':id/job')
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
    return this.usersService.deleteMany(ids);
  }
}
