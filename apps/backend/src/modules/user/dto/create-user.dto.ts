import { IsNotEmpty, IsString, MinLength } from 'class-validator';

export interface ICreateUserDto {
  username: string;
  password: string;
  organization_name: string;
}

export class CreateUserDto implements ICreateUserDto {
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsString()
  @MinLength(5)
  password: string;

  @IsString()
  @MinLength(5)
  organization_name: string;
}
