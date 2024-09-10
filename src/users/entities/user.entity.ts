import { Job } from 'jobs/entities/job.entity';
import { BelongsToSetAssociationMixin, FindOptions, Op } from 'sequelize';
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

const searchFields = ['firstName', 'lastName', 'email'];

export const DEFAULT_STATUS = 'pending';
export const STATUS_OPTIONS = ['active', DEFAULT_STATUS, 'blocked'];

@Scopes(() => ({
  withJob: {
    include: { model: Job },
  },
  whereJob(jobs: string | string[]): FindOptions<User> {
    return {
      include: {
        model: Job,
        where: {
          name: Array.isArray(jobs) ? { [Op.in]: jobs } : jobs,
        },
      },
    };
  },
  whereStatus(status: string): FindOptions<User> {
    return {
      where: { status },
    };
  },
  withSearch(searchTerm: string): FindOptions<User> {
    return {
      where: {
        [Op.or]: searchFields.map((field) => ({
          [field]: { [Op.like]: `%${searchTerm}%` },
        })),
      },
    };
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

  @Column({ type: DataType.STRING })
  firstName: string;

  @Column({ type: DataType.STRING })
  lastName: string;

  @Column({ type: DataType.STRING, allowNull: false })
  email: string;

  @Column(DataType.VIRTUAL)
  fullName: string;

  @Column({ type: DataType.STRING })
  password: string;

  @Column({
    type: DataType.STRING,
    defaultValue: DEFAULT_STATUS,
    values: STATUS_OPTIONS,
    allowNull: false,
  })
  status: string;

  @ForeignKey(() => Job)
  jobId: number;

  @BelongsTo(() => Job, 'jobId')
  job: Job;

  setJob: BelongsToSetAssociationMixin<Job, User['jobId'] | null>;
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
