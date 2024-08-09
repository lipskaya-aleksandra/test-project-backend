import { FilterParams } from 'common/decorators/filter-params.decorator';
import { Job } from 'jobs/entities/job.entity';
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

@Scopes(() => ({
  withJob: {
    include: { model: Job },
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

  @ForeignKey(() => Job)
  jobId: number;

  @BelongsTo(() => Job, 'jobId')
  job: Job;

  setJob: BelongsToSetAssociationMixin<Job, User['jobId']>;
}

export const sortableUserProps = [
  'id',
  'email',
  'firstName',
  'lastName',
  'createdAt',
  'updatedAt',
] as const;

export const filterableUserProps = ['status'] as const;

export const referenceFilterParamsMap: FilterParams['referenceParamsMap'] = [
  {
    key: 'job',
    mapFilter: (values: string[]): IncludeOptions => {
      return {
        model: Job,
        where: {
          name: { [Op.in]: values },
        },
      };
    },
  },
];
