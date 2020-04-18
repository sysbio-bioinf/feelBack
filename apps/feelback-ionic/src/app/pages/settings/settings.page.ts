import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-settings',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage extends AbstractComponent implements OnInit {
  currentLanguage: string;

  constructor(private translateService: TranslateService) {
    super();
  }

  ngOnInit() {
    this.currentLanguage = this.translateService.currentLang;
  }

  switchLanguage(event: CustomEvent) {
    this.translateService.use(event.detail.value);
    this.currentLanguage = this.translateService.currentLang;
  }
}
