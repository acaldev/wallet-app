import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const allowUnauthorized = ['/api/login', '/api/register'];
    if (allowUnauthorized.includes(request.url)) {
      return true;
    }
    const bearerToken = request.get('Authorization');
    if (!bearerToken) {
      return !!bearerToken;
    }
    const token = bearerToken.replace('Bearer ', '');
    const valid = await this.authService.validate(token);
    return !!valid;
  }
}
