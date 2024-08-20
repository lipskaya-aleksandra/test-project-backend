import { SequelizeOptions } from 'sequelize-typescript';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { User } from 'users/entities/user.entity';
import { Job } from 'jobs/entities/job.entity';
import { RefreshToken } from 'authentication/entities/refresh-token.entity';

dotenv.config({ path: path.join(process.cwd(), 'database.env') });

const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +(process.env.DATABASE_PORT ?? 3000),
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [User, Job, RefreshToken],
  timezone: '+00:00',
};

export default sequelizeConfig;
