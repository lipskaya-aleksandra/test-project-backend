import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { FilterQueryDto } from 'common/dto/filter-query.dto';
import { Request } from 'express';
import { Op } from 'sequelize';

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

export const FilterParams = createParamDecorator(
  (validParams: readonly string[], ctx: ExecutionContext): FilterQueryDto[] => {
    const req: Request = ctx.switchToHttp().getRequest();
    const query = req.query;
    const where: any = {};

    validParams.forEach((filter) => {
      if (query[filter]) {
        const values = Array.isArray(query[filter])
          ? query[filter]
          : [query[filter]];
        where[filter] = values.length > 1 ? { [Op.in]: values } : values[0];
      }
    });

    return where;
    // let inputFilterArr: string[];

    // if (typeof filter === 'string') inputFilterArr = [filter];
    // else inputFilterArr = filter;
    // if (!inputFilterArr) return null;

    // if (typeof validParams != 'object')
    //   throw new BadRequestException('Invalid filter parameter');

    // const filtersArr: FilterQueryDto[] = inputFilterArr.map((f) => {
    //   if (
    //     !f.match(
    //       /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,.]+$/,
    //     ) &&
    //     !f.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
    //   ) {
    //     throw new BadRequestException('Invalid filter parameter format');
    //   }

    //   const [property, rule, value] = f.split(':');
    //   if (!validParams.includes(property))
    //     throw new BadRequestException(
    //       `Invalid filter property: ${property}. Property should be one of the following: ${validParams}`,
    //     );
    //   if (!Object.keys(ruleMap).includes(rule))
    //     throw new BadRequestException(
    //       `Invalid filter rule: ${rule}. Rule should be one of the following: ${Object.keys(ruleMap)}`,
    //     );

    //   return { property, rule, value };
    //});

    // for (const f in inputFilterArr) {
    //   if (
    //     !f.match(
    //       /^[a-zA-Z0-9_]+:(eq|neq|gt|gte|lt|lte|like|nlike|in|nin):[a-zA-Z0-9_,]+$/,
    //     ) &&
    //     !f.match(/^[a-zA-Z0-9_]+:(isnull|isnotnull)$/)
    //   ) {
    //     throw new BadRequestException('Invalid filter parameter format');
    //   }

    //   const [property, rule, value] = f.split(':');
    //   if (!validParams.includes(property))
    //     throw new BadRequestException(
    //       `Invalid filter property: ${property}. Property should be one of the following: ${validParams}`,
    //     );
    //   if (!Object.keys(ruleMap).includes(rule))
    //     throw new BadRequestException(
    //       `Invalid filter rule: ${rule}. Rule should be one of the following: ${Object.keys(ruleMap)}`,
    //     );

    //   filtersArr.push({ property, rule, value });
    // }

    //return filtersArr;
  },
);
