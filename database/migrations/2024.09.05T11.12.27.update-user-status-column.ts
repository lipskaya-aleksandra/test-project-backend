import { Migration } from 'config/umzug/migrations';
import { DataTypes } from 'sequelize';
import { DEFAULT_STATUS, STATUS_OPTIONS } from 'users/entities/user.entity';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.changeColumn(
      'Users',
      'status',
      {
        type: DataTypes.STRING,
        allowNull: false,
        values: STATUS_OPTIONS,
        defaultValue: DEFAULT_STATUS,
      },
      { transaction },
    );

    await context.bulkUpdate(
      'Users',
      { status: DEFAULT_STATUS },
      { status: null },
      { transaction },
    );
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.changeColumn(
      'Users',
      'status',
      {
        type: DataTypes.STRING,
      },
      { transaction },
    );
  });
};
