import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import ISO6391 from 'iso-639-1';
import { ApplicationLanguageModel } from '../models/application-language.model';
import { environment } from './../../environments/environment';

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
      this.appLanguages = [];
      // uncomment after finishing the unit tests
      // console.log(error);
    }

    return this.appLanguages;
  }

  getIsoLocaleNames(codes: string[]) {
    try {
    } catch (error) {}
  }

  switchLanguage(newLanguage: string) {
    this.translateService.use(newLanguage);
    this.currentLanguage = this.translateService.currentLang;
  }
}
