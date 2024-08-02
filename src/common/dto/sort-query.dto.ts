import { IsNotEmpty, IsString, IsIn } from 'class-validator';

export class SortQueryDto {
  @IsString()
  @IsNotEmpty()
  property: string;

  @IsIn(['asc, desc'])
  @IsString()
  @IsNotEmpty()
  direction: string;
}
