import { Type } from 'class-transformer';
import { IsNotEmpty, IsPositive } from 'class-validator';

export class PaginationQueryDto {
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  perPage: number;
}
