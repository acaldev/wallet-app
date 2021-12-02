import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ExchangeRate, ExchangeRateDocument } from '../schemas';

@Injectable()
export class ExchageRateService {
  constructor(
    @InjectModel(ExchangeRate.name)
    private exchangeRateModel: Model<ExchangeRateDocument>
  ) {}

  async fetch(username: string): Promise<ExchangeRate[]> {
    const data = await this.exchangeRateModel.find({ username }).exec();
    return data;
  }
}
