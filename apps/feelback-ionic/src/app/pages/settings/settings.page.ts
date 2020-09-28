import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { TranslateService } from '@ngx-translate/core';
import * as languagesJson from '../../../assets/languages/languages.json';
import { ApplicationLanguageModel } from '../../models/applicationLanguage.model';

@Component({
  selector: 'feelback-ionic-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends AbstractComponent implements OnInit {
  currentLanguage: string;

  availableLanguages: ApplicationLanguageModel[];

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.availableLanguages = languagesJson.availableLanguages;
  }

  switchLanguage(event: CustomEvent) {
    this.translateService.use(event.detail.value);
    this.currentLanguage = this.translateService.currentLang;
  }
}
