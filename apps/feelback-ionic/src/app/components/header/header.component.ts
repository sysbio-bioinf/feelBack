import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { IonSelect } from '@ionic/angular';
import { ApplicationLanguageModel } from '../../models/applicationLanguage.model';
import { LanguageService } from '../../services/language.service';

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

  constructor(private languageService: LanguageService) {}

  ngOnInit() {
    this.currentLanguage = this.languageService.getCurrentLanguage();
    this.availableLanguages = this.languageService.getAvailableLanguages();
  }

  switchLanguage(event: CustomEvent) {
    this.languageService.switchLanguage(event.detail.value);
    this.currentLanguage = this.languageService.getCurrentLanguage();
  }

  displayLanguageDialog() {
    this.languageSelectRef.open();
  }
}
