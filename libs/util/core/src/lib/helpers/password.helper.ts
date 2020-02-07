import * as argon2 from 'argon2';

export class PasswordHelper {
  static async hashPassword(password: string): Promise<string> {
    return await argon2.hash(password);
  }

  static async validatePassword(
    hash: string,
    password: string
  ): Promise<boolean> {
    return await argon2.verify(hash, password);
  }
}
