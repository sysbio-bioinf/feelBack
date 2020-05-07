import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-web-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  constructor(readonly translateService: TranslateService) {}

  ngOnInit(): void {}

  switchLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
