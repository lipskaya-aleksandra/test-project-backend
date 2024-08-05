import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import {
  Exclude,
  Expose,
  plainToClass,
  plainToInstance,
  Type,
} from 'class-transformer';
import { RoleOutputDto } from 'roles/dto/output-role.dto';

@Exclude()
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
  @Type(() => RoleOutputDto)
  readonly role?: RoleOutputDto;

  // @Expose({ name: 'roleDto' })
  // getRole() {
  //   return plainToInstance(RoleOutputDto, this.role);
  // }

  @Expose()
  @IsString()
  readonly status?: string;
}
