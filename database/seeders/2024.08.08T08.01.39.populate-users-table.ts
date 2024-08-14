import {
  rand,
  randEmail,
  randFirstName,
  randLastName,
  randNumber,
} from '@ngneat/falso';
import { Migration } from 'config/umzug/seeders';

function generateUsers() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      jobId: randNumber({ min: 1, max: 12 }),
      status: rand(['active', 'pending', 'blocked']),
    });
  }

  return users;
}

export const up: Migration = async ({ context }) => {
  const users = generateUsers();
  context.sequelize.transaction(async (transaction) => {
    await context.bulkInsert('Users', users, { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.bulkDelete(
      'Users',
      null,
      // @ts-expect-error: options exist according to the docs
      { truncate: true, transaction, restartIdentity: true },
    );
  });
};
