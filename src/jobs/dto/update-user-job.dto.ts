import { IsInt, Min } from 'class-validator';

export class UpdateUserJobDto {
  @Min(0)
  @IsInt()
  id: number;
}
