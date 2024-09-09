import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Matches,
  MinLength,
  ValidateIf,
} from 'class-validator';

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

  @Matches(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_])[A-Za-z\d\W_]{8,}$/)
  @MinLength(8)
  @IsString()
  @ValidateIf((object, value) => !!value)
  @IsOptional()
  password?: string;

  @IsOptional()
  jobId?: number | null;
}
