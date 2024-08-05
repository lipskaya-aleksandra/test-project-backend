import { rand, randNumber } from '@ngneat/falso';
import { Migration } from 'config/umzug';
import { Op } from 'sequelize';

export const up: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.bulkUpdate(
      'Users',
      {
        roleId: randNumber({ min: 0, max: 14 }),
        status: rand(['active', 'pending', 'blocked']),
      },
      { roleId: null, status: null },
      { transaction },
    );
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.bulkUpdate(
      'Users',
      {
        roleId: { [Op.not]: null },
        status: { [Op.not]: null },
      },
      { roleId: null, status: null },
      { transaction },
    );
  });
};
