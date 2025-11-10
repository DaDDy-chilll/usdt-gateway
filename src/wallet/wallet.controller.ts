import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { RegisterMerchantDto } from './dto/register-merchant.dto';

@Controller('api/usdt')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  @Post('register')
  async register(@Body() dto: RegisterMerchantDto) {
    return this.walletService.registerMerchant(dto);
  }

  @Post('create-merchant-account')
  async createMerchantAccount(@Body() dto: CreateMerchantDto) {
    return this.walletService.createMerchantUsdtAccount(dto);
  }
}
