import { Migration } from 'config/umzug';

import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.addColumn(
      'Users',
      'roleId',
      {
        type: DataTypes.INTEGER,
        references: {
          model: 'Roles',
          key: 'id',
        },
        onDelete: 'SET NULL',
        allowNull: true,
      },
      { transaction },
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
