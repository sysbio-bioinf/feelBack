import { Component, OnInit } from '@angular/core';
import { AbstractComponent } from 'src/app/core/components/abstract.component';
import { Router } from '@angular/router';

@Component({
  selector: 'feelback-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage extends AbstractComponent {
  public appPages = [
    {
      title: 'app.menu.start',
      url: '/main/home',
      icon: 'home-outline',
    },
    {
      title: 'app.menu.profile',
      url: '/main/my/profile',
      icon: 'person-circle-outline',
    },
    {
      title: 'app.menu.organizations',
      url: '/main/organizations',
      icon: 'medkit-outline',
    },
  ];

  public contentPages = [
    {
      title: 'app.menu.settings',
      url: '/main/settings',
      icon: 'settings-outline',
    },
    {
      title: 'app.menu.faq',
      url: '/main/faq',
      icon: 'help-circle-outline',
    },
    {
      title: 'app.menu.contact',
      url: '/main/imprint',
      icon: 'mail-outline',
    },
  ];

  constructor(private router: Router) {
    super();
  }

  logout() {
    // this.userService.logout(); // TODO
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
