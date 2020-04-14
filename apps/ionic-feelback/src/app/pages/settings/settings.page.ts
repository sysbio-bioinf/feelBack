import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'cancerlog-settings-page',
  templateUrl: './settings.page.html',
  styleUrls: ['./settings.page.scss'],
})
export class SettingsPage implements OnInit {
  constructor(private translateService: TranslateService) {}

  ngOnInit() {}

  switchLanguage(event: CustomEvent) {
    this.translateService.use(event.detail.value);
  }
}
