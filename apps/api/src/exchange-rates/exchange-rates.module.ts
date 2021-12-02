import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ExchangeRateController } from './controllers';
import { ExchangeRate, ExchangeRateSchema } from './schemas';
import { ExchageRateService } from './services';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: ExchangeRate.name, schema: ExchangeRateSchema },
    ]),
  ],
  controllers: [ExchangeRateController],
  providers: [ExchageRateService],
})
export class ExchangeRatesModule {}
