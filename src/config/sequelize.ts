import { SequelizeOptions } from 'sequelize-typescript';
import * as path from 'path';
import * as dotenv from 'dotenv';
import { User } from 'users/models/user.model';
import { Role } from 'users/models/role.model';

dotenv.config({ path: path.join(process.cwd(), '.env') });

const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',
  host: process.env.DATABASE_HOST,
  port: +process.env.DATABASE_PORT,
  username: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: process.env.DATABASE_NAME,
  models: [User, Role], //path.join(__dirname, '/../**/**/*.model.ts')
  // modelMatch: (filename, member) => {
  //   console.log({ filename, member });

  //   const entityName = filename.substring(0, filename.indexOf('.model'));

  //   return entityName === member.toLowerCase();
  // },

  // timezone: '+00:00', // ??
};

export default sequelizeConfig;
