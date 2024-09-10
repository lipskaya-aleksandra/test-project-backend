import { Inject, Injectable, NotFoundException } from '@nestjs/common';
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

  async findById(id: number) {
    const job = await this.jobRepository.findByPk(id);
    if (!job) {
      throw new NotFoundException('Job not found');
    }
    return job;
  }
}
