import { Exclude, Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

//@Exclude()
export class RoleOutputDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsNumber()
  // @IsNotEmpty()
  // id: number;
}
