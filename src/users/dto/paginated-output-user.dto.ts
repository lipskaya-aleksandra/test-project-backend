import { IsNotEmpty, IsNumber } from 'class-validator';
import { Exclude, Expose, Type } from 'class-transformer';
import { OutputUserDto } from './output-user.dto';

//@Exclude()
export class PaginatedOutputUserDto {
  @Expose()
  @IsNumber()
  @IsNotEmpty()
  readonly count: number;

  @Expose()
  @Type(() => OutputUserDto)
  readonly rows: OutputUserDto[];
}
