import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { RolesService } from './roles.service';
import { TransformInterceptor } from 'common/interceptors/plain-to-class.interceptor';
import { RoleOutputDto } from './dto/output-role.dto';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) {}

  @UseInterceptors(new TransformInterceptor(RoleOutputDto))
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}
