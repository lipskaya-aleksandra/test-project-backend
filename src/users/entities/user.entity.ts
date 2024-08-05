import { BelongsToSetAssociationMixin, IncludeOptions, Op } from 'sequelize';
import {
  Table,
  Column,
  Model,
  DataType,
  PrimaryKey,
  AutoIncrement,
  ForeignKey,
  Scopes,
  BelongsTo,
} from 'sequelize-typescript';
import { Role } from '../../roles/entities/role.entity';

@Scopes(() => ({
  withRole: {
    include: { model: Role /*  attributes: ['name', 'id']  */ },
  },
}))
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

  @Column({
    type: DataType.STRING,
  })
  status: string;

  @ForeignKey(() => Role)
  roleId: number;

  @BelongsTo(() => Role, 'roleId')
  role: Role;

  setRole: BelongsToSetAssociationMixin<Role, User['roleId']>;
}

export const sortableUserProps = [
  'id',
  'email',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
] as const;

export const filterableUserProps = ['status', 'id', 'email'] as const;

export const referenceFilterParamsMap = [
  {
    filter: 'role',
    mapFilter: (values: string[]): IncludeOptions => {
      console.log(values);
      return {
        model: Role,
        where: {
          name: { [Op.in]: values },
        },
      };
    },
  },
];
