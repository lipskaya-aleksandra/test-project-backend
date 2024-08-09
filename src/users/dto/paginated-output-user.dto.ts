import { Expose, Type } from 'class-transformer';
import { OutputUserDto } from './output-user.dto';
import { PaginatedDto } from 'common/dto/paginated.dto';

export class PaginatedOutputUserDto extends PaginatedDto<OutputUserDto> {
  @Expose()
  @Type(() => OutputUserDto)
  readonly rows: OutputUserDto[];
}
