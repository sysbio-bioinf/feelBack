import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-web-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage implements OnInit {
  constructor(readonly translateService: TranslateService) {}

  ngOnInit(): void {}

  getMarkdownFile(file: string): string {
    const filePath = `./assets/texts/${this.translateService.currentLang}/${file}.md`;
    return filePath;
  }
}
