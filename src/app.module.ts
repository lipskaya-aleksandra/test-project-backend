import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import { RolesModule } from './roles/roles.module';
import sequelizeConfig from './config/sequelize';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
      }),
      isGlobal: true,
      envFilePath: '.env',
    }),

    SequelizeModule.forRoot(sequelizeConfig),

    UsersModule,

    RolesModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
