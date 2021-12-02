import { HttpException, HttpStatus } from '@nestjs/common';
import { ErrorResponse } from './models/error-response.model';

export class ErrorException extends HttpException {
  constructor(
    error: ErrorResponse = {
      error: {
        code: 'UNKNOWN_ERROR',
        title: 'Oops! something its going wrong',
        messages: [],
      },
    }
  ) {
    super(error, HttpStatus.BAD_REQUEST);
  }
}
