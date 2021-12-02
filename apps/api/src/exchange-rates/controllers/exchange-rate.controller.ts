import { Controller, Get, HttpStatus, Res } from '@nestjs/common';
import { ErrorException, GetUser } from 'src/core';
import { ExchageRateService } from '../services/exchage-rate.service';

@Controller('exchange-rate')
export class ExchangeRateController {
  constructor(private readonly exchangeRateService: ExchageRateService) {}
  @Get()
  async fetch(@Res() res, @GetUser() username: string) {
    try {
      const data = await this.exchangeRateService.fetch(username);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (e) {
      throw new ErrorException();
    }
  }
}
