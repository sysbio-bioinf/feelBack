import { Component, OnInit } from '@angular/core';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.page.html',
  styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {
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
    {
      title: 'app.menu.logout',
      url: '/',
      icon: 'log-out-outline',
    },
  ];

  constructor(private navController: NavController) {}

  ngOnInit() {}
}
