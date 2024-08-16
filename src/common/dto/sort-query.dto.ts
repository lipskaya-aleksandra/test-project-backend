import { IsString, IsIn, IsOptional } from 'class-validator';
import { FindAndCountOptions } from 'sequelize';

export class SortQueryDto {
  @IsString()
  @IsOptional()
  sortBy: string = 'id';

  @IsIn(['asc', 'desc'])
  @IsString()
  @IsOptional()
  order: string = 'asc';

  getDbSortOptions(): FindAndCountOptions {
    return {
      order: [[this.sortBy, this.order]],
    };
  }
}
