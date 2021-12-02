import { Injectable } from '@nestjs/common';
import { decode, sign, verify } from 'jsonwebtoken';
import { LoginResponse, UsernameResponse } from '../models';
const { ACCESS_TOKEN_SECRET } = process.env;

@Injectable()
export class AuthService {
  async create(claims: UsernameResponse): Promise<LoginResponse> {
    const token = sign(claims, ACCESS_TOKEN_SECRET, {
      expiresIn: '30m',
    });
    return { user: claims, auth: { token } };
  }

  async validate(token: string): Promise<boolean> {
    try {
      return !!verify(token, ACCESS_TOKEN_SECRET);
    } catch (e) {
      return false;
    }
  }

  decode(token: string): UsernameResponse {
    const claims = decode(token) as UsernameResponse;
    return claims;
  }
}
