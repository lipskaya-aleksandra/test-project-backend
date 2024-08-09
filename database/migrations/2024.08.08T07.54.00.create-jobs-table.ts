import { Migration } from 'config/umzug/migrations';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.createTable(
      'Jobs',
      {
        id: {
          type: DataTypes.INTEGER,
          autoIncrement: true,
          primaryKey: true,
        },
        name: {
          type: DataTypes.STRING,
          unique: true,
        },
      },
      { transaction },
    );
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.dropTable('Jobs', { transaction });
  });
};
