import { Component, OnInit } from '@angular/core';
import { TranslateService, TranslatePipe } from '@ngx-translate/core';

@Component({
  selector: 'feelback-web-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
  providers: [TranslatePipe],
})
export class StartPage implements OnInit {
  constructor(
    private translateService: TranslateService,
    private translatePipe: TranslatePipe,
  ) {
    console.log(this.translateService.instant('app.title'));
    console.log(this.translatePipe.transform('app.title'));
  }

  ngOnInit(): void {}
}
