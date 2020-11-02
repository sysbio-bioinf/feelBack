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

  availableLanguages: ApplicationLanguageModel[];

  constructor(private translateService: TranslateService) {}

  getCurrentLanguage() {
    this.currentLanguage = this.translateService.currentLang;
    return this.currentLanguage;
  }

  getAvailableLanguages() {
    this.availableLanguages = ISO6391.getLanguages(
      environment.languages.availableLanguages,
    );
    return this.availableLanguages;
  }

  switchLanguage(newLanguage: string) {
    this.translateService.use(newLanguage);
    this.currentLanguage = this.translateService.currentLang;
  }
}
