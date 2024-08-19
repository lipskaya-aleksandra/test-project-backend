import { Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsOptional,
  IsPositive,
  IsString,
} from 'class-validator';
import { DbQueryOptions, QueryDto } from 'common/query.interface';

export abstract class PaginationAndSortingQueryDto implements QueryDto {
  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  page: number;

  @IsPositive()
  @IsNotEmpty()
  @Type(() => Number)
  perPage: number;

  @IsString()
  @IsOptional()
  abstract sortBy: string;

  @IsIn(['asc', 'desc'])
  @IsString()
  @IsOptional()
  order: string = 'asc';

  getDbQueryOptions(): DbQueryOptions {
    return {
      scopes: [],
      queryOptions: {
        order: [[this.sortBy, this.order]],
        limit: this.perPage,
        offset: (this.page - 1) * this.perPage,
      },
    };
  }
}
