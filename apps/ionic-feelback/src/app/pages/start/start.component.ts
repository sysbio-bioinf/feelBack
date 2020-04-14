import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { BaseComponent } from '@cancerlog/core';
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

  loginWithForm() {
    this.router.navigate(['/auth/form']);
  }

  loginAsAnonymous() {
    this.router.navigate(['/main/home']);
  }
}
