import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import sequelizeConfig from './config/sequelize';
import { JobsModule } from 'jobs/jobs.module';
import { AuthenticationModule } from './core/authentication/authentication.module';
import { JwtModule } from '@nestjs/jwt';
import { EnvVariables, validationSchema } from 'config/envVariables';
import { AccountModule } from 'account/account.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema,
      isGlobal: true,
      envFilePath: ['.env'],
    }),

    SequelizeModule.forRootAsync({
      useFactory: async () => ({
        ...sequelizeConfig,
        autoLoadModels: true,
        logging: false,
      }),
    }),

    UsersModule,

    JobsModule,

    AuthenticationModule,

    AccountModule,

    JwtModule.registerAsync({
      global: true,
      useFactory: async (configService: ConfigService<EnvVariables>) => ({
        secret: configService.get('JWT_SECRET', { infer: true }),
        signOptions: {
          expiresIn: configService.get('JWT_EXPIRES_IN', { infer: true }),
        },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
