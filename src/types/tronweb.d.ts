declare module 'tronweb' {
  interface TronWebOptions {
    fullHost: string;
    privateKey?: string;
    fullNode?: any;
    solidityNode?: any;
    eventServer?: any;
  }

  interface Address {
    fromPrivateKey(privateKey: string): string;
  }

  interface Providers {
    HttpProvider: new (url: string) => any;
  }

  class TronWeb {
    static providers: Providers;
    static address: Address;

    constructor(
      fullNode: any,
      solidityNode: any,
      eventServer: any,
      privateKey?: string,
    );

    address: {
      fromPrivateKey(privateKey: string): string;
    };
  }

  export default TronWeb;
}
