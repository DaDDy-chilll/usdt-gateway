import { Injectable } from '@nestjs/common';
import { WalletKeyDeriverResolver } from './wallet-deriver.resolver';
import { CreateMerchantDto } from './dto/create-merchant.dto';
import { WalletCreatedDto } from './dto/wallet-created.dto';
import { Chain } from '../common/chain.enum';

@Injectable()
export class WalletService {
  constructor(private readonly keyResolver: WalletKeyDeriverResolver) {}

  async registerMerchant(dto: { merchantId: string; name: string; contactEmail: string; }) {
    // minimal: persist merchant to DB
    // here we just return a simple object; in production inject repository and save
    return { ok: true, merchantId: dto.merchantId, createdAt: new Date().toISOString() };
  }

  async createMerchantUsdtAccount(dto: CreateMerchantDto): Promise<WalletCreatedDto> {
    const chain = dto.chain as Chain;
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
