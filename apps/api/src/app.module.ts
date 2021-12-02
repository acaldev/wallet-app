import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { CommandModule } from 'nestjs-command';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthGuard, CoreModule } from './core';
import { AuthService } from './core/auth/services/auth.service';
import { ExchangeRatesModule } from './exchange-rates/exchange-rates.module';
import { WalletModule } from './wallets/wallet.module';
const { DB_HOST, DB_PORT, DB_NAME } = process.env;

@Module({
  imports: [
    ExchangeRatesModule,
    WalletModule,
    CommandModule,
    MongooseModule.forRoot(`mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`, {
      useNewUrlParser: true,
    }),
    CoreModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
