import { Migration } from 'config/umzug';

import { DataTypes } from 'sequelize';
import { Role } from 'users/models/role.model';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.addColumn(
      'Users',
      'roleId',
      {
        type: DataTypes.STRING,
        references: {
          model: Role,
          key: 'id',
        },
      },
      {
        transaction,
      },
    );
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.removeColumn('Users', 'roleId', {
      transaction,
    });
  });
};
