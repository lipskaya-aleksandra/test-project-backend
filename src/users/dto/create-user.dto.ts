import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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

  @IsString()
  @IsOptional()
  role?: string;
}
