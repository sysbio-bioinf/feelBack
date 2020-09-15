import { Component, OnInit, Input } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

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

  currentLanguage: string;

  constructor(private translateService: TranslateService) {}

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

  switchLanguage(event: CustomEvent) {
    this.translateService.use(event.detail.value);
    this.currentLanguage = this.translateService.currentLang;
  }
}
