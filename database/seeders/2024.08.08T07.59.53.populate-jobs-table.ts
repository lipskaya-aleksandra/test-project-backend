import { randJobType } from '@ngneat/falso';
import { Migration } from 'config/umzug/seeders';
import { Job } from 'jobs/entities/job.entity';

function generateJobs(count: number) {
  const roles = new Set<string>();

  for (let i = 0; i < count; i++) {
    roles.add(randJobType());
  }

  return Array.from(roles).map((name) => ({
    name,
  }));
}

export const up: Migration = async ({ context }) => {
  const jobs = generateJobs(15);

  context.sequelize.transaction(async (transaction) => {
    await context.bulkInsert('Jobs', jobs, { transaction });
  });
};

export const down: Migration = async ({ context }) => {
  context.sequelize.transaction(async (transaction) => {
    await context.bulkDelete(
      'Jobs',
      null,
      // @ts-expect-error: options exist according to the docs
      { truncate: true, transaction, restartIdentity: true },
      Job,
    );
  });
};
