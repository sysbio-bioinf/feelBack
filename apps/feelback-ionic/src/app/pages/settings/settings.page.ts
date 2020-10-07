import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { ApplicationLanguageModel } from '../../models/applicationLanguage.model';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'feelback-ionic-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends AbstractComponent implements OnInit {
  currentLanguage: string;

  availableLanguages: ApplicationLanguageModel[];

  constructor(private languageService: LanguageService) {
    super();
  }

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.availableLanguages = this.languageService.getAvailableLanguages();
  }

  switchLanguage(event: CustomEvent) {
    this.languageService.switchLanguage(event.detail.value);
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }
}
