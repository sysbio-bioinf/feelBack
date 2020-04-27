import * as argon2 from 'argon2';

export class PasswordHelper {
  static async hashPassword(password: string): Promise<string> {
    return argon2.hash(password);
  }

  static async validatePassword(
    hash: string,
    password: string,
  ): Promise<boolean> {
    return argon2.verify(hash, password);
  }
}
