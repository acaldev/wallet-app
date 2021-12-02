import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Expose, Transform } from 'class-transformer';
import { Document } from 'mongoose';
import { transformSchema } from 'src/core';

export type ExchangeRateDocument = ExchangeRate & Document;

const reqStr = { required: true, type: String };

@Schema({ timestamps: true })
export class ExchangeRate {
  @Expose({ name: '_id' })
  @Transform(({ value }) => value.toString())
  id: string;
  @Prop(reqStr)
  username: string;
  @Prop(reqStr)
  currency: string;
  @Prop({ required: true })
  rate: number;
}

export const ExchangeRateSchema = transformSchema(
  SchemaFactory.createForClass(ExchangeRate)
);
