import { IsInt, Min, ValidateIf } from 'class-validator';

export class UpdateUserJobDto {
  @Min(0)
  @IsInt()
  @ValidateIf((object, value) => value !== null)
  id: number;
}
