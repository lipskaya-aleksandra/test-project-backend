import { Migration } from 'config/umzug';

import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.addColumn('Users', 'status', DataTypes.STRING, {
      transaction,
    });
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.removeColumn('Users', 'status', {
      transaction,
    });
  });
};
