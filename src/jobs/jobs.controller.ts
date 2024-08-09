import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { TransformInterceptor } from 'common/interceptors/plain-to-class.interceptor';
import { JobOutputDto } from './dto/output-job.dto';
import { JobsService } from './jobs.service';

@Controller('jobs')
export class JobsController {
  constructor(private readonly rolesService: JobsService) {}

  @UseInterceptors(new TransformInterceptor(JobOutputDto))
  @Get()
  findAll() {
    return this.rolesService.findAll();
  }
}
