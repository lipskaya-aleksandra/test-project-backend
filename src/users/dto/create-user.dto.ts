import { IsString } from 'class-validator';
export class CreateUserDto {
    @IsString()
    readonly display_name: string;
}
