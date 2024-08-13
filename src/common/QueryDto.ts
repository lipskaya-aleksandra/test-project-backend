import { WhereOptions } from 'sequelize';
import { PaginationQueryDto } from './dto/pagination-query.dto';
import { SortQueryDto } from './dto/sort-query.dto';

export type QueryDto = {
  paginationQuery: PaginationQueryDto;
  filters?: WhereOptions;
  sortQuery?: SortQueryDto;
  searchTerm?: string;
};
