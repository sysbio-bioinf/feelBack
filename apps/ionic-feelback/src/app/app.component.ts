import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as NgxStatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';
import { StorageService } from '@cancerlog/ionic/core/services';
import { TranslatePipe } from '@ngx-translate/core';
import { UserService } from './services/user.service';

@Component({
  selector: 'cancerlog-root',
  templateUrl: 'app.component.html',
  providers: [TranslatePipe],
})
export class AppComponent {
  exitAppSubscription: any;

  constructor(
    private router: Router,
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: NgxStatusBar,
    private storageService: StorageService,
    private translatePipe: TranslatePipe,
    private userService: UserService,
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

      // this.exitAppSubscription = this.platform.backButton.subscribeWithPriority(
      //   1000000,
      //   () => {
      //     if (this.router.url === '/start') {
      //       if (
      //         window.confirm(
      //           this.translatePipe.transform(
      //             'app.dialogs.exitApplication.text',
      //           ),
      //         )
      //       ) {
      //         this.userService.logout();

      //         const appString = 'app';
      //         navigator[appString].exitApp();
      //       }
      //     }
      //   },
      // );

      this.storageService
        .createFeelbackDirectories()
        .then(() => console.log('feelback download directory created'))
        .catch((exception) => console.log(exception));
    });
  }
}
