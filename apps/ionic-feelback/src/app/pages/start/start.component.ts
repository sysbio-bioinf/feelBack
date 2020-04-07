import { Component } from '@angular/core';
import { BaseComponent } from '@cancerlog/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'page-start',
  templateUrl: 'start.component.html',
})
export class StartComponent extends BaseComponent {
  constructor(
    readonly router: Router,
    readonly translateService: TranslateService,
  ) {
    super();
  }

  showTutorial() {
    this.router.navigate(['/tutorial']);
  }

  loginWithQRCode() {}

  loginWithForm() {}

  loginAsAnonymous() {
    this.router.navigate(['/main/home']);
  }

  setLanguage(lang: string) {
    this.translateService.use(lang);
  }
}
