import { WhereOptions } from 'sequelize';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { SortQueryDto } from './dto/sort-query.dto';

export type QueryObj = {
  paginationQuery: PaginationQueryDto;
  filtersWhere?: WhereOptions;
  sortQuery?: SortQueryDto;
  searchTerm?: string;
};
