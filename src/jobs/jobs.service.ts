import { Inject, Injectable } from '@nestjs/common';
import { Job } from './entities/job.entity';
import { JOB_REPOSITORY } from './constants';

@Injectable()
export class JobsService {
  constructor(
    @Inject(JOB_REPOSITORY) private readonly jobRepository: typeof Job,
  ) {}

  async findAll() {
    return await this.jobRepository.findAll();
  }
}
