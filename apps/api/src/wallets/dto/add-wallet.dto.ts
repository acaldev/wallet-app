import { IsBoolean, IsOptional, IsString, Length } from 'class-validator';

export class AddWalletDTO {
  @IsString()
  @Length(2, 100)
  name: string;

  @IsString()
  @Length(2, 200)
  address: string;

  @IsOptional()
  @IsBoolean()
  favorite: boolean;
}
