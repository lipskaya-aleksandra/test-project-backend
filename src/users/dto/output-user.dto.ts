import { IsNotEmpty, IsString, IsEmail, IsDate } from 'class-validator';
import { Exclude, Expose, Transform } from 'class-transformer';

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

  @Transform(({ obj }) => (obj.role ? obj.role.name : null), {
    toClassOnly: true,
  })
  @Expose()
  @IsString()
  readonly role?: string;

  @Expose()
  @IsString()
  readonly status?: string;
}
