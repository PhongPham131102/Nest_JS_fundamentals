import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsEmail,
  MinLength,
} from 'class-validator';
export class LoginUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  @IsEmail()
  readonly email: string;
  @IsString()
  @MinLength(8)
  @MaxLength(30)
  readonly password: string;
}
