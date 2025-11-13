import { Injectable } from '@nestjs/common';
import { WalletKeyDeriverResolver } from './wallet-deriver.resolver';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { WalletCreatedDto } from './dto/wallet-created.dto';

@Injectable()
export class WalletService {
  constructor(private readonly keyResolver: WalletKeyDeriverResolver) {}

  async createMerchantUsdtAccount(
    dto: CreateMerchantDto,
  ): Promise<WalletCreatedDto> {
    const chain = dto.chain;
    const derived = await this.keyResolver.generateNew(chain);
    // Optionally: encrypt mnemonic / privateKey before saving. DO NOT store plain in DB.
    const response: WalletCreatedDto = {
      merchantId: dto.merchantId,
      chain: dto.chain,
      address: derived.address,
      mnemonic: derived.mnemonic,
      privateKey: dto.exportPrivateKey ? derived.privateKey : undefined,
      destinationReference: derived.destinationReference,
    };
    // Persist account metadata (address, destinationReference, merchantId) to DB.
    return response;
  }
}
