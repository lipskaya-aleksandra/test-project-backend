import { IsNotEmpty, IsInt, Min, IsString, ValidateIf } from 'class-validator';

export class JobReferenceDto {
  @IsString()
  @IsNotEmpty()
  @ValidateIf((object, value) => value !== null)
  name: string | null;

  @Min(0)
  @IsInt()
  @ValidateIf((object, value) => value !== null)
  id: number | null;
}
