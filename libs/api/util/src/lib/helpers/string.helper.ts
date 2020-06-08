import { uuid } from 'uuidv4';

export class StringHelper {
  static uuid4() {
    return uuid();
  }

  static randomString(
    length: number = 10,
    alphabet: string = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789',
  ): string {
    let text = '';

    for (let i = 0; i < length; i++) {
      text =
        text + alphabet.charAt(Math.floor(Math.random() * alphabet.length));
    }

    return text;
  }
}
