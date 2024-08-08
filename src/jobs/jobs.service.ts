import { Inject, Injectable } from '@nestjs/common';
import { JOB_REPOSITORY } from 'common/constants';
import { Job } from './entities/job.entity';

@Injectable()
export class JobsService {
  constructor(
    @Inject(JOB_REPOSITORY) private readonly jobRepository: typeof Job,
  ) {}

  async findAll() {
    return await this.jobRepository.findAll();
  }
}
