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

  navigateToLogin() {
    this.router.navigate(['/auth/qrcode']);
  }

  loginWithQRCode() {
    this.router.navigate(['/auth/qrcode']);
  }

  loginWithForm() {
    this.router.navigate(['/auth/form']);
  }

  loginAsAnonymous() {
    this.router.navigate(['/main/home']);
  }
}
