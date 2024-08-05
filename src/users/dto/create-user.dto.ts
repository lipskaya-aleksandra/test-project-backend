import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { RoleReferenceDto } from 'roles/dto/reference-role.dto';

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
  @Type(() => RoleReferenceDto)
  role?: RoleReferenceDto;
}
