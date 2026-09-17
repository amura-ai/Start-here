// RSA-encrypt request bodies before sending, matching the BE's
// PMS_UTIL.unMaskEventAsync decryption. Mirrors the pattern used by
// amura-health-web (src/Utils/s3Services.ts :: maskParams).
import { Crypt } from 'hybrid-crypto-js';

const publicKey = import.meta.env.VITE_PUBLIC_KEY as string | undefined;

let crypt: Crypt | null = null;
function getCrypt(): Crypt {
  if (!crypt) crypt = new Crypt();
  return crypt;
}

export interface MaskedPayload {
  payLoad: string;
}

/**
 * Encrypt an object with the RSA public key and wrap it in the envelope
 * the BE decrypt middleware expects: { payLoad: base64(ciphertext) }.
 */
export function maskPayload(body: unknown): MaskedPayload {
  if (!publicKey) {
    throw new Error(
      'VITE_PUBLIC_KEY is not set — cannot encrypt request payload. Add it to .env.{env}.',
    );
  }
  const json = typeof body === 'string' ? body : JSON.stringify(body ?? {});
  const encrypted = getCrypt().encrypt(publicKey, json);
  return { payLoad: btoa(encrypted) };
}

export function isEncryptionAvailable(): boolean {
  return !!publicKey;
}
