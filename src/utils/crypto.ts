import { sha256 } from 'js-sha256';
import * as tweetnacl from 'tweetnacl';

export const generateKeyPair = async () => {
  const keyPair = tweetnacl.sign.keyPair();
  return {
    privateKey: Buffer.from(keyPair.secretKey).toString('base64'),
    publicKey: Buffer.from(keyPair.publicKey).toString('base64'),
  };
};

export const hashMessage = (message: string): string => {
  return sha256(message);
};

export const signMessage = async (message: string, privateKeyBase64: string): Promise<string> => {
  const privateKey = Buffer.from(privateKeyBase64, 'base64');
  const messageHash = hashMessage(message);
  const signature = tweetnacl.sign.detached(
    Buffer.from(messageHash),
    privateKey
  );
  return Buffer.from(signature).toString('base64');
};

export const verifySignature = async (
  message: string,
  signatureBase64: string,
  publicKeyBase64: string
): Promise<boolean> => {
  try {
    const publicKey = Buffer.from(publicKeyBase64, 'base64');
    const signature = Buffer.from(signatureBase64, 'base64');
    const messageHash = hashMessage(message);
    return tweetnacl.sign.detached.verify(
      Buffer.from(messageHash),
      signature,
      publicKey
    );
  } catch (error) {
    return false;
  }
}; 