import { FindAndCountOptions, ScopeOptions } from 'sequelize';

export type DbQueryOptions = {
  queryOptions: FindAndCountOptions;
  scopes: ScopeOptions[];
};

export interface QueryDto {
  getDbQueryOptions(): DbQueryOptions;
}
