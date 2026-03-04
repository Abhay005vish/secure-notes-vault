import CryptoJS from "crypto-js";

const AES_KEY = "supersecretkey";

export const encryptMessage = (text: string) => {
  return CryptoJS.AES.encrypt(text, AES_KEY).toString();
};

export const decryptMessage = (cipher: string) => {
  return CryptoJS.AES.decrypt(cipher, AES_KEY).toString(CryptoJS.enc.Utf8);
};
