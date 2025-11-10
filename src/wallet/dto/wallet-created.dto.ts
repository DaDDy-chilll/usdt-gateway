export class WalletCreatedDto {
  merchantId: string;
  chain: string;
  address: string; // address you can import into MetaMask (EVM format)
  mnemonic?: string; // 12/24-word phrase (if requested)
  privateKey?: string; // hex private key (only if requested)
  destinationReference?: string; // xpub / neutered extpub (if you choose to support)
}
