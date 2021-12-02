import { IsEmail, IsString, Length } from 'class-validator';

export class RegisterDTO {
  @IsString()
  @Length(5, 10)
  username: string;

  @IsString()
  @Length(2, 100)
  firstName: string;

  @IsString()
  @Length(2, 100)
  lastName: string;

  @IsEmail()
  email: string;

  @Length(2, 10)
  password: string;
}
