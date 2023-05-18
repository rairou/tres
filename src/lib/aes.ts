// typescript native wrapper for `react-native-aes-crypto`
import { NativeModules } from 'react-native';

export type Algorithms = 'aes-128-cbc' | 'aes-192-cbc' | 'aes-256-cbc'

type AesNativeType = {
    pbkdf2(password: string, salt: string, cost: number, length: number): Promise<string>
    encrypt(text: string, key: string, iv: string, algorithm: Algorithms): Promise<string>
    decrypt(ciphertext: string, key: string, iv: string, algorithm: Algorithms): Promise<string>
    hmac256(ciphertext: string, key: string): Promise<string>
    hmac512(ciphertext: string, key: string): Promise<string>
    randomKey(length: number): Promise<string>
    sha1(text: string): Promise<string>
    sha256(text: string): Promise<string>
    sha512(text: string): Promise<string>
}
export const AesNative: AesNativeType = NativeModules.Aes;
