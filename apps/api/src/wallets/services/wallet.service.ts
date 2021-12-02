import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { AxiosResponse } from 'axios';
import { isBefore, sub, toDate } from 'date-fns';
import { Model } from 'mongoose';
import { firstValueFrom, map, Observable } from 'rxjs';
import { fromWei } from 'web3-utils';
import { AddWalletDTO } from '../dto';
import { TxListResponse, WalletBalanceResponse } from '../models';
import { Wallet, WalletDocument } from '../schemas';
const { ETHERSCAN_API_KEY } = process.env;

@Injectable()
export class WalletService {
  constructor(
    private httpService: HttpService,
    @InjectModel(Wallet.name) private walletModel: Model<WalletDocument>
  ) {}

  async fetch(
    username: string,
    field = 'createdAt',
    direction: 'asc' | 'desc' = 'desc'
  ): Promise<Wallet[]> {
    const sortBy = `${direction === 'desc' && '-'}${field}`;
    const wallets = await this.walletModel
      .find({ username })
      .sort(sortBy)
      .exec();
    return wallets;
  }

  async get(username: string, _id: string): Promise<Wallet> {
    const wallet = await this.walletModel.findOne({ username, _id }).exec();
    return wallet;
  }

  async add(username: string, wallet: AddWalletDTO): Promise<Wallet> {
    const newWallet = new this.walletModel({ ...{ username }, ...wallet });
    await newWallet.save();
    return newWallet;
  }

  async update(username: string, _id: string, wallet: Wallet): Promise<Wallet> {
    const updatedWallet = await this.walletModel.findOneAndUpdate(
      { username, _id },
      wallet,
      {
        new: true,
      }
    );
    return updatedWallet;
  }

  async hydrateWallet(wallet: Wallet) {
    const balance = await firstValueFrom(this.balance(wallet.address));
    const old = await firstValueFrom(this.isOld(wallet.address));
    const { id, address, favorite, name } = wallet;
    return {
      ...{ id, address, favorite, name },
      ...{ old, balance },
    };
  }

  isOld(address: string): Observable<boolean> {
    const afterYear = sub(new Date(), { years: 1 });
    return this.transactionsApi(address, 1).pipe(
      map(
        ({
          data: {
            result: [{ timeStamp }],
          },
        }: AxiosResponse<TxListResponse>) => {
          return isBefore(toDate(Number(timeStamp)), afterYear);
        }
      )
    );
  }

  balance(address: string): Observable<string> {
    return this.balanceApi(address).pipe(
      map(({ data: { result } }: AxiosResponse<WalletBalanceResponse>) =>
        fromWei(result, 'ether')
      )
    );
  }

  balanceApi(
    address: string
  ): Observable<AxiosResponse<WalletBalanceResponse>> {
    return this.httpService.get(
      `https://api.etherscan.io/api?module=account&action=balance&address=${address}&tag=latest&apikey=${ETHERSCAN_API_KEY}`
    );
  }

  transactionsApi(
    address: string,
    page: number
  ): Observable<AxiosResponse<TxListResponse>> {
    return this.httpService.get(
      `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=${page}&offset=1&sort=asc&apikey=${ETHERSCAN_API_KEY}`
    );
  }
}
