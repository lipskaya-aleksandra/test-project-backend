import { SequelizeOptions } from 'sequelize-typescript';
import * as path from 'path';
import { kebabCase } from 'lodash';

import { vars } from './envVariables';

const {
  DATABASE_HOST,
  DATABASE_NAME,
  DATABASE_PASSWORD,
  DATABASE_PORT,
  DATABASE_USER,
} = vars;

const sequelizeConfig: SequelizeOptions = {
  dialect: 'postgres',

  host: DATABASE_HOST,
  port: DATABASE_PORT,
  username: DATABASE_USER,
  password: DATABASE_PASSWORD,
  database: DATABASE_NAME,

  // NOTE: modelMatch works only with SequelizeModule.forRootAsync
  // (option {autoLoadModels: true} is needed)
  // for SequelizeModule.forRoot models must be passed as an array of pointers
  // to the classes

  modelMatch: (filename, member) => {
    console.log({ filename, member });
    const entityName = filename.substring(0, filename.indexOf('.entity'));
    return entityName === kebabCase(member);
  },
  models: [path.join(__dirname, '/../**/**/*.entity.ts')],
  timezone: '+00:00',
};

export default sequelizeConfig;
