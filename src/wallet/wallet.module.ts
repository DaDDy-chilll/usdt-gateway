import { Module } from '@nestjs/common';
import { WalletService } from './wallet.service';
import { WalletController } from './wallet.controller';
import { WalletKeyDeriverResolver } from './wallet-deriver.resolver';
import { EvmKeyDeriver } from './derivers/evm-key-deriver';
import { TronKeyDeriver } from './derivers/tron-key-deriver';

@Module({
  controllers: [WalletController],
  providers: [
    WalletService,
    EvmKeyDeriver,
    TronKeyDeriver,
    {
      provide: WalletKeyDeriverResolver,
      useFactory: (evm: EvmKeyDeriver, tron: TronKeyDeriver) => {
        return new WalletKeyDeriverResolver([evm, tron]);
      },
      inject: [EvmKeyDeriver, TronKeyDeriver],
    },
  ],
  exports: [WalletService],
})
export class WalletModule {}
