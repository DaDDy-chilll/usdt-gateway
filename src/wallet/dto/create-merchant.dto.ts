import { IsString, IsEnum, IsOptional } from 'class-validator';
import { Chain } from '../../common/chain.enum';

export class CreateMerchantDto {
  @IsString() merchantId: string;
  @IsEnum(Chain) chain: Chain;
  @IsOptional() @IsString() destinationReference?: string;
  @IsOptional() exportPrivateKey?: boolean;
}
