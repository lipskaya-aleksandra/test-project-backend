import { Module } from '@nestjs/common';
import { RolesService } from './roles.service';
import { RolesController } from './roles.controller';
import { rolesProviders } from './role.providers';
import { Role } from './entities/role.entity';
import { SequelizeModule } from '@nestjs/sequelize';

@Module({
  imports: [SequelizeModule.forFeature([Role])],
  controllers: [RolesController],
  providers: [RolesService, ...rolesProviders],
})
export class RolesModule {}
