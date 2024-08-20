import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/sequelize';
import { JobsModule } from 'jobs/jobs.module';
import { AuthenticationModule } from './authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import * as path from 'path';
import * as dotenv from 'dotenv';

dotenv.config({ path: path.join(process.cwd(), 'jwt.env') });

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        DATABASE_HOST: Joi.required(),
        DATABASE_PORT: Joi.number().default(5432),
        JWT_SECRET: Joi.required(),
      }),
      isGlobal: true,
      envFilePath: ['database.env', 'jwt.env'],
    }),

    SequelizeModule.forRoot(sequelizeConfig),

    UsersModule,

    JobsModule,

    AuthenticationModule,

    JwtModule.registerAsync({
      global: true,
      useFactory: async () => ({
        secret: process.env.JWT_SECRET,
        signOptions: {
          expiresIn: process.env.JWT_EXPIRES_IN,
        },
      }),
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
