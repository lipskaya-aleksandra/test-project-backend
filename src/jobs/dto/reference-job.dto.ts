import { IsNotEmpty, IsInt, Min, IsString } from 'class-validator';

export class JobReferenceDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Min(0)
  @IsInt()
  id: number;
}
