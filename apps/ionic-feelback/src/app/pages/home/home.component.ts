import { Component } from '@angular/core';
import { BaseComponent } from '@cancerlog/core';
import { Router } from '@angular/router';

@Component({
  selector: 'page-home',
  templateUrl: 'home.component.html',
})
export class HomeComponent extends BaseComponent {
  constructor(readonly router: Router) {
    super();
  }

  showTutorial() {
    this.router.navigate(['/tutorial']);
  }

  loginWithQRCode() {}

  loginWithForm() {}

  loginAsAnonymous() {}
}
