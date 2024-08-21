import { OmitType } from '@nestjs/mapped-types';
import { IsNotEmpty, IsString, Matches, MinLength } from 'class-validator';
import { CreateUserDto } from 'users/dto/create-user.dto';

export class SignUpDto extends OmitType(CreateUserDto, ['password']) {
  @Matches(/^(?=.*d)(?=.*[a-z])(?=.*[A-Z])(?=.*[W_])[A-Za-z\d\W_]{8,}$/)
  @MinLength(8)
  @IsString()
  @IsNotEmpty()
  password: string;
}
