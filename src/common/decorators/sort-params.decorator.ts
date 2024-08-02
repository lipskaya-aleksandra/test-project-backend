import {
  BadRequestException,
  createParamDecorator,
  ExecutionContext,
} from '@nestjs/common';
import { SortQueryDto } from 'common/dto/sort-query.dto';
import { Request } from 'express';

export const SortParams = createParamDecorator(
  (validParams: readonly string[], ctx: ExecutionContext): SortQueryDto => {
    const req: Request = ctx.switchToHttp().getRequest();
    const sort = req.query.sort as string;
    if (!sort) return null;

    if (typeof validParams != 'object')
      throw new BadRequestException('Invalid sort parameter');

    const sortPattern = /^([a-zA-Z0-9]+):(asc|desc)$/;
    if (!sort.match(sortPattern))
      throw new BadRequestException('Invalid sort parameter');

    const [property, direction] = sort.split(':');
    if (!validParams.includes(property))
      throw new BadRequestException(
        `Invalid sort property: ${property}. Sort property should be one of the following: ${validParams}`,
      );

    return { property, direction };
  },
);
