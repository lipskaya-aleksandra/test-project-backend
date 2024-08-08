// import { SequelizeStorage, Umzug } from 'umzug';
// import sequelizeConfig from './sequelize';
// import { Sequelize } from 'sequelize-typescript';
// import { QueryInterface } from 'sequelize';
// import * as path from 'path';

// const sequelize = new Sequelize(sequelizeConfig);

// const umzug = new Umzug<QueryInterface>({
//   migrations: {
//     glob: 'migrations/*.ts',
//   },
//   storage: new SequelizeStorage({ sequelize }),
//   context: sequelize.getQueryInterface(),
//   logger: console,

//   create: {
//     folder: path.join(process.cwd(), '/migrations'),
//   },
// });

// export type Migration = typeof umzug._types.migration;

// export default umzug;

// exports.umzug = umzug;

// if (require.main === module) {
//   umzug.runAsCLI();
// }
