import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { availableLanguages } from '../../constants/languages.constants';

@Component({
  selector: 'feelback-web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(readonly translateService: TranslateService) {}

  avLanguages = availableLanguages;

  languageDropdownSelection: { short: string; full: string }[] = [
    { short: 'en', full: 'English' },
    { short: 'de', full: 'Deutsch' },
  ];

  ngOnInit(): void {}

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
