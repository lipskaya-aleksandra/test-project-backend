import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { FindOptions, IncludeOptions, Op } from 'sequelize';

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
