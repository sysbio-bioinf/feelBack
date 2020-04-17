import { Injectable } from '@angular/core';
import { Card } from '../models/card.model';

@Injectable({
  providedIn: 'root',
})
export class CardService {
  constructor() {}

  readCard(text: string) {
    const data = JSON.parse(text);
    if (data.version === 1) {
      return this.parseCardV1(data);
    }

    throw new Error(
      'Cannot understand the Version of this Card. Please use the regular Login via Form!',
    );
  }

  private parseCardV1(data: any) {
    const card: Card = {
      version: data.version,
      pseudonym: data.pseudonym,
    };
    return card;
  }
}
