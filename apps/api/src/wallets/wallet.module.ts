import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthService } from '../core';
import { WalletController } from './controllers';
import { Wallet, WalletSchema } from './schemas/';
import { WalletService } from './services';

@Module({
  imports: [
    HttpModule,
    MongooseModule.forFeature([{ name: Wallet.name, schema: WalletSchema }]),
  ],
  controllers: [WalletController],
  providers: [WalletService, AuthService],
})
export class WalletModule {}
