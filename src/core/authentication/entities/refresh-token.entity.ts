import {
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
} from 'sequelize-typescript';
import { User } from 'users/entities/user.entity';

@Table({ tableName: 'RefreshTokens' })
export class RefreshToken extends Model<RefreshToken> {
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
