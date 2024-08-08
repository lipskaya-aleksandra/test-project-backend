import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { Expose, Type } from 'class-transformer';
import { JobOutputDto } from 'jobs/dto/output-job.dto';

export class OutputUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly id: number;

  @Expose({ name: 'fullName' })
  getFullName() {
    return [this.firstName, this.lastName].filter(Boolean).join(' ');
  }

  @Expose()
  @IsEmail()
  @IsNotEmpty()
  readonly email: string;

  @Expose()
  @IsString()
  readonly firstName?: string;

  @Expose()
  @IsString()
  readonly lastName?: string;

  @Expose()
  @IsDate()
  readonly createdAt: Date;

  @Expose()
  @Type(() => JobOutputDto)
  readonly job?: JobOutputDto;

  @Expose()
  @IsString()
  readonly status?: string;
}
