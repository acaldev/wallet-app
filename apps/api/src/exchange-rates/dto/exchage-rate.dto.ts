import { IsNumber, Length } from 'class-validator';

export class ExchangeRateDTO {
  @IsNumber()
  @Length(2, 100)
  name: string;
}
