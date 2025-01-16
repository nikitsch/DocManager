import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(5) //TODO check
  password: string;

  @IsString()
  @IsNotEmpty()
  organization_name: string;
}
