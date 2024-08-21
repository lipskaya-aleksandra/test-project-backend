import { IsInt, IsNotEmpty, Min } from 'class-validator';

export class JwtPayloadDto {
  @Min(0)
  @IsInt()
  @IsNotEmpty()
  userId: number;
}
