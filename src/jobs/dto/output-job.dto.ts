import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class JobOutputDto {
  @Expose()
  @IsString()
  @IsNotEmpty()
  name: string;

  @Expose()
  @IsNumber()
  @IsNotEmpty()
  id: number;
}
