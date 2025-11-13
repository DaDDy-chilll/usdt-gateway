import { IsString, IsEnum, IsOptional, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Chain } from '../../common/chain.enum';

export class CreateMerchantDto {
  @ApiProperty({
    description: 'Unique identifier for the merchant',
    example: 'merchant-123',
  })
  @IsString()
  merchantId: string;

  @ApiProperty({
    description: 'Blockchain network for the USDT wallet',
    enum: Chain,
    example: Chain.BSC,
  })
  @IsEnum(Chain, {
    message: 'Invalid chain. Must be either BSC or ETH',
  })
  chain: Chain;

  @ApiProperty({
    description: 'Optional reference ID for the destination',
    required: false,
    example: 'ref-12345',
  })
  @IsString()
  @IsOptional()
  destinationReference?: string;

  @ApiProperty({
    description: 'Whether to export the private key',
    required: false,
    default: false,
    example: false,
  })
  @IsBoolean()
  @IsOptional()
  exportPrivateKey?: boolean;
}
