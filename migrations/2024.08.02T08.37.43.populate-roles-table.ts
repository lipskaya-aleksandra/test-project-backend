import { randJobType } from '@ngneat/falso';
import { Migration } from 'config/umzug';
import { CreateRoleDto } from 'roles/dto/create-role.dto';

function generateRoles() {
  const roles = new Set<CreateRoleDto>();

  for (let i = 0; i < 15; i++) {
    roles.add({
      name: randJobType(),
    });
  }

  return Array.from(roles);
}

export const up: Migration = async ({ context }) => {
  const roles = generateRoles();
  context.sequelize.transaction(async (transaction) => {
    await context.bulkInsert('Roles', roles, { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.bulkDelete('Roles', null, { transaction });
  });
};
