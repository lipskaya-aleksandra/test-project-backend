import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { JobReferenceDto } from 'jobs/dto/reference-job.dto';

export class CreateUserDto {
  @IsString()
  @IsOptional()
  firstName?: string;

  @IsString()
  @IsOptional()
  lastName?: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsOptional()
  password?: string;

  @IsOptional()
  @Type(() => JobReferenceDto)
  job?: JobReferenceDto;
}
