import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';
import { AuthService } from 'src/core';

@Injectable()
export class ParseTokenPipe implements PipeTransform {
  constructor(private authService: AuthService) {}
  async transform(value: any, _metadata: ArgumentMetadata) {
    return this.authService.decode(value).username;
  }
}
