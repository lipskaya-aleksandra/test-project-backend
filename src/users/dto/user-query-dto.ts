import { IsIn, IsOptional, IsString } from 'class-validator';
import { PaginationAndSortingQueryDto } from 'common/dto/pagination-and-sorting-query.dto';

import { DbQueryOptions, QueryDto } from 'common/query.interface';
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

    if (this.job) scopes.push({ method: ['whereJob', this.job] });
    if (this.status) scopes.push({ method: ['whereStatus', this.status] });
    if (this.search) scopes.push({ method: ['withSearch', this.search] });

    return {
      queryOptions,
      scopes,
    };
  }
}
