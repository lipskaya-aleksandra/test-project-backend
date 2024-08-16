// import { FindAndCountOptions } from 'sequelize';
// import { PaginationQueryDto } from './pagination-query.dto';
// import { SortQueryDto } from './sort-query.dto';
// import { Query } from 'common/query.interface';
// import { Expose, Transform, Type, plainToInstance } from 'class-transformer';

// export class QueryDto implements Query {
//   // @Type(() => PaginationQueryDto)
//   @Transform(({ obj }) => (console.log(obj), obj))
//   // @Expose()
//   paginationQuery: PaginationQueryDto;

//   sortQuery?: SortQueryDto;
//   searchFilterQuery?: Query;

//   getDbQueryOptions(): FindAndCountOptions {
//     console.log({ paginationQuery: this.paginationQuery });
//     return {
//       offset: (this.paginationQuery.page - 1) * this.paginationQuery.perPage,
//       limit: this.paginationQuery.perPage,
//       order: this.sortQuery
//         ? [[this.sortQuery.property, this.sortQuery.direction]]
//         : [['id', 'asc']],
//       ...this.searchFilterQuery?.getDbQueryOptions(),
//     };
//   }
// }
