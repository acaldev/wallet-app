import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { transformSchema } from 'src/core';

export type WalletDocument = Wallet & Document;

const reqStr = { required: true, type: String };

@Schema({ timestamps: true })
export class Wallet {
  @Expose({ name: '_id' })
  @Transform(({ value }) => value.toString())
  id: string;
  @Prop(reqStr)
  username: string;
  @Prop(reqStr)
  name: string;
  @Prop(reqStr)
  address: string;
  @Prop({ default: false })
  favorite: boolean;
}

export const WalletSchema = transformSchema(
  SchemaFactory.createForClass(Wallet)
);
