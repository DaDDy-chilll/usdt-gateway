import { IsString } from 'class-validator';

export class RegisterMerchantDto {
  @IsString() merchantId: string;
  @IsString() name: string;
  @IsString() contactEmail: string;
}
