import { Chain } from '../../common/chain.enum';

export interface DerivationResult {
  destinationReference?: string; // xpub / extpub if you implement it
  mnemonic: string;
  address: string;
  privateKey?: string;
}

export interface IWalletKeyDeriver {
  supports(chain: Chain): boolean;
  generateNew(chain: Chain): Promise<DerivationResult>;
}
