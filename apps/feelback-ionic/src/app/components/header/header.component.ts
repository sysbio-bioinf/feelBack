import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';
import * as languagesJson from '../../../assets/languages/languages.json';
import { ApplicationLanguageModel } from '../../models/applicationLanguage.model';

@Component({
  selector: 'feelback-ionic-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  @Input() title: string;
  @Input() showNavButton = false;
  @Input() showBackButton = false;
  @Input() showSwitchLanguageButton = false;

  @ViewChild('languageSelect') languageSelectRef: IonSelect;

  currentLanguage: string;

  availableLanguages: ApplicationLanguageModel[];

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
    this.availableLanguages = languagesJson.availableLanguages;
  }

  switchLanguage(event: CustomEvent) {
    this.translateService.use(event.detail.value);
    this.currentLanguage = this.translateService.currentLang;
  }

  displayLanguageDialog() {
    this.languageSelectRef.open();
  }
}
