import { FindAndCountOptions, Op } from 'sequelize';
import { QueryObj } from './QueryObjType';
import { merge } from 'lodash';

export default function getDbQueryOptions(
  query: QueryObj,
  searchFields: string[],
): FindAndCountOptions {
  const {
    paginationQuery: { page, perPage },
    searchTerm,
    sortQuery,
    filtersWhere,
  } = query;

  const options: FindAndCountOptions = {
    offset: (page - 1) * perPage,
    limit: perPage,
    order: sortQuery
      ? [[sortQuery.property, sortQuery.direction]]
      : [['id', 'asc']],
    ...filtersWhere,
  };

  if (searchTerm) {
    merge(options.where, {
      where: {
        [Op.or]: searchFields.map((field) => ({
          [field]: { [Op.like]: `%${searchTerm}%` },
        })),
      },
    });
  }
  return options;
}
