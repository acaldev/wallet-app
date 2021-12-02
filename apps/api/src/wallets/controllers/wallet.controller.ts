import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { ErrorException, GetUser } from 'src/core';
import { AddWalletDTO } from '../dto/add-wallet.dto';
import { WalletService } from '../services';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Get()
  async fetch(
    @Res() res,
    @Query('favorite') favorite: boolean,
    @GetUser() username: string
  ) {
    try {
      const data = await this.walletService.fetch(
        username,
        favorite && 'favorite'
      );
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (e) {
      throw new ErrorException();
    }
  }

  @Post()
  async add(
    @Res() res,
    @Body() request: AddWalletDTO,
    @GetUser() username: string
  ) {
    try {
      const wallet = await this.walletService.add(username, request);
      const data = await this.walletService.hydrateWallet(wallet);
      const message = 'Wallet Added';
      return res.status(HttpStatus.OK).json({
        message,
        data,
      });
    } catch (e) {
      throw new ErrorException();
    }
  }

  @Get(':id')
  async get(@Res() res, @Param('id') id: string, @GetUser() username: string) {
    try {
      const wallet = await this.walletService.get(username, id);
      if (!wallet) {
        throw new Error();
      }
      const data = await this.walletService.hydrateWallet(wallet);
      return res.status(HttpStatus.OK).json({
        data,
      });
    } catch (e) {
      throw new ErrorException();
    }
  }

  @Put(':id/favorite')
  async favorite(
    @Res() res,
    @Param('id') id: string,
    @GetUser() username: string
  ) {
    try {
      const wallet = await this.walletService.get(username, id);
      if (!wallet) {
        throw new Error();
      }
      wallet.favorite = !wallet.favorite;
      await this.walletService.update(username, id, wallet);
      const data = await this.walletService.hydrateWallet(wallet);
      const message = 'Wallet Added to Favorites';
      return res.status(HttpStatus.OK).json({
        message,
        data,
      });
    } catch (e) {
      throw new ErrorException();
    }
  }
}
