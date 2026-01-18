import { IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserDto {
  id: number;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  password: string;
}
