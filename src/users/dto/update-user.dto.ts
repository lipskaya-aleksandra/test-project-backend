import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { FilterQueryDto } from 'common/dto/filter-query.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// export const getWhere = (filters: FilterQueryDto[]) => {
//     if (!filters)
//         return {}

//     const where = {}

//     filters.map(({property, rule, value}) => {

//     })

//     return where;
// };
