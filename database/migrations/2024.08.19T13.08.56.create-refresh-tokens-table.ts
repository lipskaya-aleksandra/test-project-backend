import { Migration } from 'config/umzug/migrations';
import { DataTypes } from 'sequelize';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.createTable(
      'RefreshTokens',
      {
        token: {
          type: DataTypes.STRING,
          unique: true,
        },
        expiryDate: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        userId: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          references: {
            model: 'Users',
            key: 'id',
          },
          onDelete: 'CASCADE',
        },
        createdAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
        updatedAt: {
          type: DataTypes.DATE,
          allowNull: false,
          defaultValue: new Date(),
        },
      },
      { transaction },
    );
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.dropTable('RefreshTokens', { transaction });
  });
};
