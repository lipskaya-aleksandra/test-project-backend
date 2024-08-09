import { FindAndCountOptions, Op } from 'sequelize';
import { QueryObj } from './QueryObjType';

export default function getDbQueryOptions(
  query: QueryObj,
  searchFields: string[],
): FindAndCountOptions {
  const {
    paginationQuery: { page, perPage },
    searchTerm,
    sortQuery,
    filters,
  } = query;

  const options: FindAndCountOptions = {
    offset: (page - 1) * perPage,
    limit: perPage,
    order: sortQuery
      ? [[sortQuery.property, sortQuery.direction]]
      : [['id', 'asc']],
    ...filters,
  };

  if (searchTerm) {
    const searchOptions = searchFields.map((field) => ({
      [field]: { [Op.like]: `%${searchTerm}%` },
    }));
    options.where = {
      ...options.where,
      [Op.or]: options.where[Op.or]
        ? [...options.where[Op.or], ...searchOptions]
        : searchOptions,
    };
  }

  return options;
}
