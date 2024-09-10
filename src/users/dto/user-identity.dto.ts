import { Expose } from 'class-transformer';
import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class UserIdentityDto {
  @Expose()
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  id: number;
}
