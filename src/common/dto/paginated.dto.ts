import { Expose } from 'class-transformer';
import { IsNotEmpty, IsNumber } from 'class-validator';

export abstract class PaginatedDto<T> {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly count: number;

  abstract rows: T[];
}
