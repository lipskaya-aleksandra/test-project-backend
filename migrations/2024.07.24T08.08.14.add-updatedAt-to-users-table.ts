import { Migration } from 'config/umzug';
import { DataType } from 'sequelize-typescript';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.addColumn('Users', 'updatedAt', DataType.DATE, {
      transaction,
    });
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.removeColumn('Users', 'updatedAt', {
      transaction,
    });
  });
};
