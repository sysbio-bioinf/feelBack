import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as NgxStatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

@Component({
  selector: 'cancerlog-root',
  templateUrl: 'app.component.html',
})
export class AppComponent {
  exitAppSubscription: any;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: NgxStatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      if (this.platform.is('capacitor')) {
        StatusBar.setStyle({
          style: StatusBarStyle.Dark,
        });
      } else {
        this.statusBar.styleDefault();
        this.splashScreen.hide();
      }

      this.exitAppSubscription = this.platform.backButton.subscribeWithPriority(
        1000,
        () => {
          if (this.router.url === '/start') {
            if (window.confirm('Ausloggen und Anwendung beenden?')) {
              // this.userService.logout();
              navigator.app.exitApp();
            }
          }
        },
      );
    });
  }
}
