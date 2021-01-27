import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import ISO6391 from 'iso-639-1';
import { ApplicationLanguageModel } from '../models/application-language.model';
import { environment } from './../../environments/environment';
import { TranslatableError } from '..//core/customErrors/translatableError';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage: string;

  appLanguages: ApplicationLanguageModel[];

  constructor(private translateService: TranslateService) {}

  getCurrentLanguage() {
    this.currentLanguage = this.translateService.currentLang;
    return this.currentLanguage;
  }

  getAvailableLanguages(languageCodes?: string[]) {
    let codes: string[];
    if (languageCodes) {
      codes = languageCodes;
    } else {
      codes = environment.languages.availableLanguages;
    }

    try {
      this.appLanguages = ISO6391.getLanguages(codes);
    } catch (error) {
      // english fallback
      this.appLanguages = [
        {
          code: 'en',
          name: 'English',
          nativeName: 'English',
        },
      ];
      console.log(error);
      throw new TranslatableError('app.errors.services.language.available');
    }

    return this.appLanguages;
  }

  switchLanguage(newLanguage: string) {
    this.translateService.use(newLanguage);
    this.currentLanguage = this.translateService.currentLang;
  }
}
