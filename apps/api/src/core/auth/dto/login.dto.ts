import { Length } from 'class-validator';

export class LoginDTO {
  @Length(5, 10)
  username: string;

  @Length(5, 10)
  password: string;
}
