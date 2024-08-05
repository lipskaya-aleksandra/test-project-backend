import { FindAndCountOptions, Op } from 'sequelize';
import { QueryObj } from './QueryObjType';

export default function getDbQueryOptions(
  query: QueryObj,
  searchFields: string[],
): FindAndCountOptions {
  const { paginationQuery, searchTerm, sortQuery, filtersWhere } = query;
  const { page, perPage } = paginationQuery;
  const options: FindAndCountOptions = {
    offset: (page - 1) * perPage,
    limit: perPage,
    order: sortQuery
      ? [[sortQuery.property, sortQuery.direction]]
      : [['id', 'asc']],
    ...filtersWhere,
  };

  if (searchTerm) {
    options.where = {
      ...options.where,
      [Op.or]: searchFields.map((field) => ({
        [field]: { [Op.like]: `%${searchTerm}%` },
      })),
    };
  }
  return options;
}
