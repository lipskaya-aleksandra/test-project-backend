import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationAndSortingQueryDto } from 'common/dto/pagination-query.dto';

import { DbQueryOptions, QueryDto } from 'common/query.interface';
import { merge } from 'lodash';

import { ScopeOptions } from 'sequelize';
import { sortableUserProps } from 'users/entities/user.entity';

export class UserQueryDto
  extends PaginationAndSortingQueryDto
  implements QueryDto
{
  @IsString({ each: true })
  @IsOptional()
  job?: string | string[];

  @IsString()
  @IsOptional()
  status?: string;

  @IsString()
  @IsOptional()
  search?: string;

  @IsIn(sortableUserProps)
  @IsString()
  @IsOptional()
  sortBy: string = 'id';

  getDbQueryOptions(): DbQueryOptions {
    const { queryOptions } = super.getDbQueryOptions();

    const scopes: ScopeOptions[] = [];

    merge(
      scopes,
      this.job && [{ method: ['whereJob', this.job] }],
      this.status && [{ method: ['whereStatus', this.status] }],
      this.search && [{ method: ['withSearch', this.search] }],
    );

    return {
      queryOptions,
      scopes,
    };
  }
}
