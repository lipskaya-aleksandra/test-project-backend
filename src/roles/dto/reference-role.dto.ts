import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class RoleReferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
