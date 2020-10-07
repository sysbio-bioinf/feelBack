import { Injectable } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as languagesJson from '../../assets/languages/languages.json';
import { ApplicationLanguageModel } from '../models/applicationLanguage.model';

@Injectable({
  providedIn: 'root',
})
export class LanguageService {
  currentLanguage: string;

  availableLanguages: ApplicationLanguageModel[];

  constructor(private translateService: TranslateService) {}

  getCurrentLanguage() {
    this.currentLanguage = this.translateService.currentLang;
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    this.availableLanguages = languagesJson.availableLanguages;
    return this.availableLanguages;
  }

  switchLanguage(newLanguage: string) {
    this.translateService.use(newLanguage);
    this.currentLanguage = this.translateService.currentLang;
  }
}
