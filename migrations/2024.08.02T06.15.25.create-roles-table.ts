import { DataTypes } from 'sequelize';

import { Migration } from 'config/umzug';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.createTable(
      'Roles',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      { transaction },
    );
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.dropTable('Roles', { transaction });
  });
};
