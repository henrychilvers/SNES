import pkg from 'crypto-js';

const { AES, enc } = pkg;

const encrypt = function (plaintext, envSetting) {
  return AES.encrypt(plaintext, envSetting.key, { iv: envSetting.iv });
};

const decrypt = function (ciphertext, envSetting) {
  return AES.decrypt(ciphertext, envSetting.key, {
    iv: envSetting.iv,
  }).toString(enc.Utf8);
};

export default {
  encrypt,
  decrypt,
};
