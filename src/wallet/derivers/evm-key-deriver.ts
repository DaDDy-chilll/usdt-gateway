import { Injectable } from '@nestjs/common';
import {
  IWalletKeyDeriver,
  DerivationResult,
} from '../interfaces/wallet-deriver.interface';
import { Chain } from '../../common/chain.enum';
import * as bip39 from 'bip39';
import { ethers } from 'ethers';

@Injectable()
export class EvmKeyDeriver implements IWalletKeyDeriver {
  supports(chain: Chain): boolean {
    return [Chain.Ethereum, Chain.Polygon, Chain.BSC].includes(chain);
  }

  generateNew(chain: Chain): Promise<DerivationResult> {
    return new Promise((resolve) => {
      // use 12-word mnemonic
      const mnemonic = bip39.generateMnemonic(128);
      // standard BIP44 path for accounts: m/44'/60'/0'/0/0
      const path = `m/44'/60'/0'/0/0`;
      const mnemonicObj = ethers.Mnemonic.fromPhrase(mnemonic);
      const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicObj, path);
      const address = wallet.address;
      const privateKey = wallet.privateKey; // 0x...
      // destinationReference: could be the xpub if you derive extended public key (not implemented here)
      resolve({
        mnemonic,
        address,
        privateKey,
        destinationReference: undefined,
      });
    });
  }
}
