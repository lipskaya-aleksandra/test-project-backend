import { Type } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';
import { UpdateUserJobDto } from 'jobs/dto/update-user-job.dto';

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

  @Matches(new RegExp('(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*W)'))
  @MinLength(8)
  @IsString()
  @ValidateIf((object, value) => !!value)
  @IsOptional()
  password?: string;

  @IsOptional()
  @Type(() => UpdateUserJobDto)
  job?: UpdateUserJobDto;
}
