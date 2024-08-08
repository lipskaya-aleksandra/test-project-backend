import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JobReferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNumber()
  @IsNotEmpty()
  id: number;
}
