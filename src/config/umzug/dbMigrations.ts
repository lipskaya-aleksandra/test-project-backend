import { SequelizeStorage, Umzug } from 'umzug';
import { Sequelize } from 'sequelize-typescript';
import { QueryInterface } from 'sequelize';
import * as path from 'path';
import sequelizeConfig from 'config/sequelize';

const sequelize = new Sequelize(sequelizeConfig);

const umzug = new Umzug<QueryInterface>({
  migrations: {
    glob: 'migrations/database/*.ts',
  },
  storage: new SequelizeStorage({ sequelize }),
  context: sequelize.getQueryInterface(),
  logger: console,

  create: {
    folder: path.join(process.cwd(), '/migrations/database'),
  },
});

export type Migration = typeof umzug._types.migration;

export default umzug;

exports.umzug = umzug;

if (require.main === module) {
  umzug.runAsCLI();
}
