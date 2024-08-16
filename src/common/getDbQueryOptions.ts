// import {
//   FindAndCountOptions,
//   FindOptions,
//   IncludeOptions,
//   Op,
//   WhereOptions,
// } from 'sequelize';
// import { QueryDto } from './dto/query.dto';

// export default function getDbQueryOptions(props: {
//   query: QueryDto;
//   searchFields: string[];
// }): FindAndCountOptions {
//   const { query, searchFields } = props;
//   const {
//     paginationQuery: { page, perPage },
//     searchTerm,
//     sortQuery,
//     filters,
//   } = query;

//   const searchOptions = searchTerm
//     ? searchFields.map((field) => ({
//         [field]: { [Op.like]: `%${searchTerm}%` },
//       }))
//     : [];

//   const where: WhereOptions = {};

//   filters?.whereable.forEach(([key, value]) => {
//     where[key] = Array.isArray(value) ? { [Op.in]: value } : value;
//   });

//   const include = filters?.refMaps.map((refMap) => {
//     const values = Array.isArray(filters.includable[refMap.key])
//       ? filters.includable[refMap.key]
//       : [filters.includable[refMap.key]];

//     return refMap.mapFilter(values as string[]);
//   });

//   const options: FindAndCountOptions = {
//     offset: (page - 1) * perPage,
//     limit: perPage,
//     order: sortQuery
//       ? [[sortQuery.property, sortQuery.direction]]
//       : [['id', 'asc']],
//     include,
//     where: {
//       ...where,
//       [Op.or]: [...searchOptions, ...(where[Op.or] ?? [])],
//     },
//   };

//   if (searchTerm) {
//     const searchOptions = searchFields.map((field) => ({
//       [field]: { [Op.like]: `%${searchTerm}%` },
//     }));

//     options.where = {
//       ...options.where,
//       [Op.or]: (options.where as WhereOptions & Record<symbol, unknown>)?.[
//         Op.or
//       ]
//         ? [
//             ...(
//               options.where as WhereOptions &
//                 Record<symbol, Record<string, unknown>>
//             )?.[Op.or],
//             ...searchOptions,
//           ]
//         : searchOptions,
//     };
//   }

//   return options;
// }
