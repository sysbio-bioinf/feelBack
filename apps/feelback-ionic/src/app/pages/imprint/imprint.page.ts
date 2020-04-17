import { Component } from '@angular/core';
import { TeamModel } from 'src/app/models/team.model';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-imprint',
  templateUrl: './imprint.page.html',
  styleUrls: ['./imprint.page.scss'],
})
export class ImprintPage extends AbstractComponent {
  teamMembers: TeamModel[] = [
    { name: 'Prof. Dr. Hans Kestler' },
    { name: 'Dr. Peter Kuhn' },
    { name: 'Dr. Klaus Hönig' },
    { name: 'Dr. Johannes Schobel' },
    { name: 'Dr. Axel Fürstberger' },
    { name: 'Carolin Halanke-Büchner' },
    { name: 'Katharina Hörner' },
    { name: 'Markus Kletting' },
  ];

  constructor(readonly translateService: TranslateService) {
    super();
  }

  getMarkdownFile(file: string): string {
    const filePath = `./assets/texts/${this.translateService.currentLang}/${file}.md`;
    return filePath;
  }
}
