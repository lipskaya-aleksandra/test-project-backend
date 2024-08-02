import {
  rand,
  randEmail,
  randFirstName,
  randJobType,
  randLastName,
} from '@ngneat/falso';
import { Migration } from 'config/umzug';

function generateUsers() {
  const users = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
      role: randJobType(),
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
    await context.bulkDelete('Users', null, { transaction });
  });
};
