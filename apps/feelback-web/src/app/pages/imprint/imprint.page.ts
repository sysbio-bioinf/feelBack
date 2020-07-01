import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-web-imprint',
  templateUrl: './imprint.page.html',
  styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage implements OnInit {
  constructor(readonly translateService: TranslateService) {}

  ngOnInit(): void {}

  getMarkdownFile(file: string): string {
    const filePath = `./assets/texts/${this.translateService.currentLang}/${file}.md`;
    return filePath;
  }
}
