import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { AbstractComponent } from '../../core/components/abstract.component';

@Component({
  selector: 'feelback-start',
  templateUrl: './start.page.html',
  styleUrls: ['./start.page.scss'],
})
export class StartPage extends AbstractComponent {
  constructor(
    readonly router: Router,
    readonly translateService: TranslateService, // private userService: UserService,
  ) {
    super();
  }

  navigateToTutorial() {
    this.router.navigate(['/tutorial']);
  }

  navigateToLogin() {
    this.router.navigate(['/auth/login']);
  }

  loginAsAnonymous() {
    // this.userService.loginAnonymous();
    this.router.navigate(['/main/home'], { replaceUrl: true });
  }
}
