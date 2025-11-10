import { Injectable } from '@nestjs/common';
import { IWalletKeyDeriver, DerivationResult } from '../interfaces/wallet-deriver.interface';
import { Chain } from '../../common/chain.enum';
import * as bip39 from 'bip39';
import { ethers } from 'ethers';
import TronWeb from 'tronweb';

@Injectable()
export class TronKeyDeriver implements IWalletKeyDeriver {
  supports(chain: Chain): boolean {
    return chain === Chain.Tron;
  }

  async generateNew(chain: Chain): Promise<DerivationResult> {
    const mnemonic = await bip39.generateMnemonic(128);
    // Tron coin type (195) path: m/44'/195'/0'/0/0
    const path = `m/44'/195'/0'/0/0`;
    const mnemonicObj = ethers.Mnemonic.fromPhrase(mnemonic);
    const wallet = ethers.HDNodeWallet.fromMnemonic(mnemonicObj, path);
    const privateKeyHex = wallet.privateKey; // starts with 0x...
    // TronWeb expects private key without 0x
    const pk = privateKeyHex.startsWith('0x') ? privateKeyHex.slice(2) : privateKeyHex;
    const tronWeb = new TronWeb(
      'https://api.trongrid.io',
      'https://api.trongrid.io',
      'https://api.trongrid.io',
      pk,
    );
    const tronAddress = tronWeb.address.fromPrivateKey(pk);
    return {
      mnemonic,
      address: tronAddress,
      privateKey: privateKeyHex,
      destinationReference: undefined,
    };
  }
}
