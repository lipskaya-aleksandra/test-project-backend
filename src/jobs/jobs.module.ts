import { Module } from '@nestjs/common';

import { SequelizeModule } from '@nestjs/sequelize';
import { Job } from './entities/job.entity';
import { JobsController } from './jobs.controller';
import { JobsService } from './jobs.service';
import { jobsProviders } from './jobs.providers';

@Module({
  imports: [SequelizeModule.forFeature([Job])],
  controllers: [JobsController],
  providers: [JobsService, ...jobsProviders],
})
export class JobsModule {}
