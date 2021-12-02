import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from 'src/core/utils';

export class AuthException extends HttpException {
  constructor(error: ErrorResponse) {
    super(error, HttpStatus.FORBIDDEN);
  }
}
