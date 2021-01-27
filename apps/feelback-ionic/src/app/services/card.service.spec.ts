import { TranslatableError } from '../core/customErrors/translatableError';
import { CardService } from './card.service';

describe('CardService test', () => {
  let cardService: CardService;

  const jsonDummyData = '{"version": 1, "pseudonym": "mock"}';
  const jsonUnknownVersion = '{"version": 42, "pseudonym": "mock"}';

  beforeEach(() => {
    cardService = new CardService();
  });

  it('should read cards (parse text to JSON)', () => {
    const cardResult = cardService.readCard(jsonDummyData);
    expect(cardResult).toBeDefined();
    expect(cardResult).toEqual({
      version: 1,
      pseudonym: 'mock',
    });
    expect(() => cardService.readCard(jsonUnknownVersion)).toThrowError(
      TranslatableError,
    );
    expect(() => cardService.readCard(jsonUnknownVersion)).toThrowError(
      'app.errors.services.card.unsupportedVersion',
    );
  });
});
