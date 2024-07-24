import { randEmail, randFirstName, randLastName } from '@ngneat/falso';
import { CreateUserDto } from 'users/dto/create-user.dto';
import { Migration } from 'config/umzug';

function generateUsers() {
  const users: CreateUserDto[] = [];

  for (let i = 0; i < 100; i++) {
    users.push({
      email: randEmail(),
      firstName: randFirstName(),
      lastName: randLastName(),
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
