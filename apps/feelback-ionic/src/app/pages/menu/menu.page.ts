import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AbstractComponent } from '../../core/components/abstract.component';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'feelback-ionic-menu',
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
      url: '/main/faqs',
      icon: 'help-circle-outline',
    },
    {
      title: 'app.menu.contact',
      url: '/main/imprint',
      icon: 'mail-outline',
    },
    {
      title: 'app.menu.privacy',
      url: '/main/privacy',
      icon: 'lock-closed-outline',
    },
  ];

  constructor(private router: Router, private userService: UserService) {
    super();
  }

  logout() {
    this.userService.logout();
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
