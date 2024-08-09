import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { FilterQueryDto } from 'common/dto/filter-query.dto';
import { Request } from 'express';
import { FindOptions, IncludeOptions, Op } from 'sequelize';

const ruleMap = {
  eq: (filter: FilterQueryDto) => ({ [filter.property]: filter.value }),
  neq: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.ne]: filter.value },
  }),
  gt: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.gt]: filter.value },
  }),
  gte: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.gte]: filter.value },
  }),
  lt: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.lt]: filter.value },
  }),
  lte: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.lte]: filter.value },
  }),
  like: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.like]: `%${filter.value}%` },
  }),
  nlike: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.notLike]: filter.value },
  }),
  in: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.in]: filter.value },
  }),
  nin: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.notIn]: filter.value },
  }),
  isnull: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.is]: null },
  }),
  isnotnull: (filter: FilterQueryDto) => ({
    [filter.property]: { [Op.not]: null },
  }),
};

export function getWhere(filters: FilterQueryDto[]) {
  if (!filters) return {};

  const where = filters.reduce((prev, filter) => {
    if (!Object.keys(prev).includes(filter.property))
      return { ...prev, ...ruleMap[filter.rule](filter) };

    const prevWhere = Array.isArray(prev[filter.property])
      ? prev[filter.property]
      : [prev[filter.property]];

    return {
      ...prev,

      [filter.property]: {
        [Op.or]: [...prevWhere, ruleMap[filter.rule](filter)[filter.property]],
      },
    };
  }, {});

  return where;
}

export type FilterParams = {
  accept: readonly string[];
  referenceParamsMap?: {
    key: string;
    mapFilter: (values: string[]) => IncludeOptions;
  }[];
};

export const FilterParams = createParamDecorator(
  (filterParams: FilterParams, ctx: ExecutionContext) => {
    const req: Request = ctx.switchToHttp().getRequest();
    const query = req.query;
    const where: FindOptions<unknown> = {};

    filterParams.accept.forEach((filter) => {
      if (query[filter]) {
        const values = Array.isArray(query[filter])
          ? query[filter]
          : [query[filter]];

        where[filter] = values.length > 1 ? { [Op.in]: values } : values[0];
      }
    });

    const include = filterParams.referenceParamsMap
      ?.filter((refMap) => !!query[refMap.key])
      ?.map((refMap) => {
        const values = Array.isArray(query[refMap.key])
          ? query[refMap.key]
          : [query[refMap.key]];

        return refMap.mapFilter(values as string[]);
      });

    return { where, include };
  },
);
