import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'users/entities/user.entity';

@Table({ tableName: 'ResetPasswordTokens' })
export class ResetPasswordToken extends Model<ResetPasswordToken> {
  @Column({
    type: DataType.STRING,
  })
  token: string;

  @Column({
    type: DataType.DATE,
  })
  expiryDate: Date;

  @PrimaryKey
  @ForeignKey(() => User)
  @Column({
    type: DataType.NUMBER,
  })
  userId: number;
}
