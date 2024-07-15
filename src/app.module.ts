import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import * as Joi from '@hapi/joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            validationSchema: Joi.object({
                DATABASE_HOST: Joi.required(),
                DATABASE_PORT: Joi.number().default(5432),
            }),
        }),
        UsersModule,
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: process.env.DATABASE_HOST,
            port: +process.env.DATABASE_PORT,
            username: process.env.DATABASE_USER,
            password: process.env.DATABASE_PASSWORD,
            database: process.env.DATABASE_NAME,
            autoLoadEntities: true,
            synchronize: true, // only fo development
        }),
    ],
    controllers: [AppController],
    providers: [AppService],
})
export class AppModule {}
