// import CryptoJS from 'crypto-js'
// import * as argon2 from 'argon2';

export function encryptPassword(password: string) {
  // const encryptedHex = CryptoJS.SHA512(password).toString();

  // try {
  //   const encryptedHex1 = argon2.hash(password, {
  //     type: argon2.argon2id,
  //     memoryCost: 2 ** 16,
  //     hashLength: 50,
  //   });

  //   console.log(encryptedHex1);
  // } catch (err) {}

  return password;
}
