import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';

@Controller('api/usdt')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('create-merchant-account')
  async createMerchantAccount(@Body() dto: CreateMerchantDto) {
    return this.walletService.createMerchantUsdtAccount(dto);
  }
}
