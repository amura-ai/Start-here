declare module 'hybrid-crypto-js' {
  export class Crypt {
    constructor(options?: Record<string, unknown>);
    encrypt(publicKey: string, plaintext: string, signature?: string): string;
    decrypt(privateKey: string, ciphertext: string): { message: string; signature?: string };
    signature(privateKey: string, message: string): string;
    verify(publicKey: string, signature: string, decrypted: string): boolean;
  }

  export class RSA {
    constructor(options?: Record<string, unknown>);
    generateKeyPairAsync(keySize?: number): Promise<{ publicKey: string; privateKey: string }>;
    generateKeyPair(keySize?: number): { publicKey: string; privateKey: string };
  }
}
