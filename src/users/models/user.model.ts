import { Sequelize } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  DefaultScope,
  ForeignKey,
} from 'sequelize-typescript';
import { Role } from './role.model';

// @DefaultScope(() => ({
//   attributes: {
//     include: [
//       [
//         Sequelize.fn(
//           'CONCAT',
//           Sequelize.col('firstName'),
//           ' ',
//           Sequelize.col('lastName'),
//         ),
//         'fullName',
//       ],
//     ],
//   },
// }))
@Table({ tableName: 'Users' })
export class User extends Model<User> {
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id: number;

  @Column({
    type: DataType.STRING,
  })
  firstName: string;

  @Column({
    type: DataType.STRING,
  })
  lastName: string;

  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  email: string;

  @Column(DataType.VIRTUAL)
  fullName: string;

  @Column({
    type: DataType.STRING,
  })
  password: string;

  @ForeignKey(() => Role)
  @Column({
    type: DataType.STRING,
    references: {
      model: Role,
      key: 'id',
    },
  })
  roleId: string;

  @Column({
    type: DataType.STRING,
  })
  status: string;
}

export const sortableUserProps = [
  'id',
  'email',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
] as const;

export const filterableUserProps = ['role', 'status', 'id', 'email'] as const;
