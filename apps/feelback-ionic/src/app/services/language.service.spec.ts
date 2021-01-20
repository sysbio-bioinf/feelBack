import { ApplicationLanguageModel } from '../models/application-language.model';
import { LanguageService } from './language.service';

describe('LanguageService test', () => {
  let languageService: LanguageService;

  let translateServiceCurrentLang = 'en';

  const mockLanguageCodes = {
    mockAvailableLanguages: ['en'],
  };

  const mockAppLanguages: ApplicationLanguageModel[] = [
    {
      code: 'en',
      name: 'English',
      nativeName: 'English',
    },
  ];

  const translateServiceMock = {
    currentLang: translateServiceCurrentLang,
    use: jest.fn((newLanguage: string) => {
      translateServiceCurrentLang = newLanguage;
    }),
  };

  beforeEach(() => {
    languageService = new LanguageService(translateServiceMock as any);
  });

  it('should get the current language from translateService', () => {
    expect(languageService.currentLanguage).toBe(undefined);
    languageService.getCurrentLanguage();
    expect(languageService.currentLanguage).toBe('en');
  });

  // TODO: Find out how to test the ISO6391.getLanguages part -> getAvailableLanguages
  // "Cannot read property 'getLanguages' of undefined"

  it('should get all available languages', () => {
    languageService.getAvailableLanguages();
  });

  it('should switch languages', () => {
    expect(languageService.currentLanguage).toBe(undefined);
    languageService.switchLanguage('de');
    expect(translateServiceMock.use).toBeCalledWith('de');
  });
});
