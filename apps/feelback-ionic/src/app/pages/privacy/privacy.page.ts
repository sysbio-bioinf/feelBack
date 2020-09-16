import { Component } from '@angular/core';
import { AbstractComponent } from '../../core/components/abstract.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-ionic-privacy',
  templateUrl: './privacy.page.html',
  styleUrls: ['./privacy.page.scss'],
})
export class PrivacyPage extends AbstractComponent {
  constructor(readonly translateService: TranslateService) {
    super();
  }

  getMarkdownFile(file: string): string {
    const filePath = `./assets/texts/${this.translateService.currentLang}/${file}.md`;
    return filePath;
  }
}
