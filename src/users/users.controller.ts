import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PaginationQueryDto } from 'src/common/dto/pagination-query.dto';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get()
    getAll(@Query() paginationQuery: PaginationQueryDto) {
        return this.usersService.getAll(paginationQuery);
    }
    @Get(':id')
    getUserById(@Param('id') id: string) {}
    @Post()
    createUser(@Body() createUserDto: CreateUserDto) {} //add User type to body later
    @Patch(':id')
    editUser(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {}
    @Delete(':id')
    deleteUser(@Param('id') id: string) {}
}
