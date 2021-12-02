import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { LoginDTO, RegisterDTO } from '../dto';
import { AuthException } from '../exceptions';
import { AuthService, UserService } from '../services';

@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService
  ) {}

  @Post('login')
  async login(@Res() res, @Body() request: LoginDTO) {
    const user = await this.userService.findByEmailPassword(
      request.username,
      request.password
    );
    if (!user) {
      throw new AuthException({
        error: {
          code: 'INVALID_CREDENTIALS',
          title: 'Invalid Credentials',
          messages: ['Please check your username and password'],
        },
      });
    }
    const { username, firstName, lastName, email } = user;
    const auth = await this.authService.create({
      username,
      firstName,
      lastName,
      email,
    });
    return res.status(HttpStatus.OK).json({
      ...auth,
    });
  }

  @Post('register')
  async register(@Res() res, @Body() request: RegisterDTO) {
    const alreadyRegistered = await this.userService.alreadyRegistered(
      request.username,
      request.email
    );
    if (!alreadyRegistered) {
      await this.userService.add(request);
      return res.status(HttpStatus.OK).json({
        message: 'Registration Success',
      });
    } else {
      throw new AuthException({
        error: {
          code: 'REGISTERED',
          title: 'Account exists',
          messages: ['Please choose another username or email'],
        },
      });
    }
  }
}
