import { Injectable } from '@angular/core';
import { TranslatableError } from '../core/customErrors/translatableError';
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

    throw new TranslatableError('app.errors.services.card.unsupportedVersion');
  }

  private parseCardV1(data: any) {
    const card: Card = {
      version: data.version,
      pseudonym: data.pseudonym,
    };
    return card;
  }
}
