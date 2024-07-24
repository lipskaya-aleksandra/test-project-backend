import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class OutputUserDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  readonly id: string;

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
}
