import { JOB_REPOSITORY } from './constants';
import { Job } from './entities/job.entity';

export const jobsProviders = [
  {
    provide: JOB_REPOSITORY,
    useValue: Job,
  },
];
