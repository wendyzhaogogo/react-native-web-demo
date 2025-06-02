import { sha256 } from 'js-sha256';
import * as tweetnacl from 'tweetnacl';
import * as ExpoCrypto from 'expo-crypto';

// 设置 tweetnacl 的随机数生成器
tweetnacl.setPRNG(async function(x, n) {
  const v = await ExpoCrypto.getRandomBytesAsync(n);
  for (let i = 0; i < n; i++) x[i] = v[i];
});

// 工具函数：将 base64 字符串转换为 Uint8Array
const base64ToUint8Array = (base64: string): Uint8Array => {
  const binaryString = atob(base64);
  const bytes = new Uint8Array(binaryString.length);
  for (let i = 0; i < binaryString.length; i++) {
    bytes[i] = binaryString.charCodeAt(i);
  }
  return bytes;
};

// 工具函数：将 Uint8Array 转换为 base64 字符串
const uint8ArrayToBase64 = (bytes: Uint8Array): string => {
  const binaryString = String.fromCharCode.apply(null, Array.from(bytes));
  return btoa(binaryString);
};

export const generateKeyPair = async () => {
  const keyPair = tweetnacl.sign.keyPair();
  return {
    privateKey: uint8ArrayToBase64(keyPair.secretKey),
    publicKey: uint8ArrayToBase64(keyPair.publicKey),
  };
};

export const hashMessage = (message: string): string => {
  return sha256(message);
};

export const signMessage = async (message: string, privateKeyBase64: string): Promise<string> => {
  const privateKey = base64ToUint8Array(privateKeyBase64);
  const messageHash = hashMessage(message);
  const messageHashBytes = new TextEncoder().encode(messageHash);
  const signature = tweetnacl.sign.detached(
    messageHashBytes,
    privateKey
  );
  return uint8ArrayToBase64(signature);
};

export const verifySignature = async (
  message: string,
  signatureBase64: string,
  publicKeyBase64: string
): Promise<boolean> => {
  try {
    const publicKey = base64ToUint8Array(publicKeyBase64);
    const signature = base64ToUint8Array(signatureBase64);
    const messageHash = hashMessage(message);
    const messageHashBytes = new TextEncoder().encode(messageHash);
    return tweetnacl.sign.detached.verify(
      messageHashBytes,
      signature,
      publicKey
    );
  } catch (error) {
    return false;
  }
}; 