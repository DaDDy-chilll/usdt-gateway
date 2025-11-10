import { Injectable } from '@nestjs/common';
import { IWalletKeyDeriver } from './interfaces/wallet-deriver.interface';
import { Chain } from '../common/chain.enum';

@Injectable()
export class WalletKeyDeriverResolver implements IWalletKeyDeriver {
  constructor(private readonly derivers: IWalletKeyDeriver[]) {}

  supports(chain: Chain): boolean {
    return this.derivers.some((d) => d.supports(chain));
  }

  async generateNew(chain: Chain) {
    const d = this.derivers.find((x) => x.supports(chain));
    if (!d) throw new Error(`No key deriver registered for chain ${chain}`);
    return d.generateNew(chain);
  }
}
