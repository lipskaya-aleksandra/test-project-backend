import { IsNotEmpty, IsString, ValidateIf } from 'class-validator';

export class FilterQueryDto {
  @IsString()
  @IsNotEmpty()
  property: string;

  @IsString()
  @IsNotEmpty()
  rule: string;

  @IsString()
  @ValidateIf((obj) => obj.rule !== 'isnull' && obj.rule !== 'isnotnull')
  @IsNotEmpty()
  value: string;
}
