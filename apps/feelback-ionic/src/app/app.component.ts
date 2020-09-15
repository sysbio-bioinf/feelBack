import { Component } from '@angular/core';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Platform } from '@ionic/angular';
import { StorageService } from './services/storage.service';

import { Router } from '@angular/router';
import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { AlertController } from '@ionic/angular';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'feelback-ionic-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  idleState = 'Not started.';
  timedOut = false;

  timeBeforeTimeout: number;

  idleAlertShown = false;

  alert: any;

  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private storageService: StorageService,
    private router: Router,
    private alertController: AlertController,
    private idle: Idle,
    private translate: TranslateService,
  ) {
    this.initializeApp();

    // Set idle and timeout time
    idle.setIdle(60 * 5);
    idle.setTimeout(60);

    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);
    idle.onIdleEnd.subscribe(() => (this.idleState = 'No longer idle.'));
    idle.onTimeout.subscribe(() => {
      if (this.router.url !== '/start') {
        this.idleState = 'Timed out!';
        this.timedOut = true;
      } else {
        this.reset();
      }
      if (this.alert) {
        this.alert.dismiss();
        this.idleAlertShown = false;
        this.logout();
        this.reset();
      }
    });
    idle.onIdleStart.subscribe(() => (this.idleState = "You've gone idle!"));
    idle.onTimeoutWarning.subscribe((countdown: number) => {
      if (this.router.url !== '/start') {
        if (!this.idleAlertShown) {
          this.idleAlertShown = true;
          this.presentIdleAlert();
        }
      } else {
        this.reset();
      }
      this.idleState = 'You will time out in ' + countdown + ' seconds!';
      this.timeBeforeTimeout = countdown;
      if (this.alert) {
        this.alert.message =
          this.translate.instant('app.idle.message') + countdown;
      }
    });

    this.reset();
    console.log(this.idleState);
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();

      this.storageService
        .createFeelbackDirectories()
        .then(() => console.log('feelback download directory created'))
        .catch((exception) => console.log(exception));
    });
  }

  reset() {
    this.idle.watch();
    this.idleState = 'Started.';
    this.timedOut = false;
  }

  async presentIdleAlert() {
    this.alert = await this.alertController.create({
      header: this.translate.instant('app.idle.header'),
      subHeader: this.translate.instant('app.idle.subheader'),
      message:
        this.translate.instant('app.idle.message') +
        this.idle.getTimeout().toString(),
      buttons: [
        {
          text: this.translate.instant('app.idle.cancel'),
          role: 'cancel',
          handler: () => {
            this.idleAlertShown = false;
            this.reset();
          },
        },
        {
          text: this.translate.instant('app.idle.logout'),
          handler: () => {
            this.idleAlertShown = false;
            this.reset();
            this.logout();
          },
        },
      ],
    });
    await this.alert.present();
  }

  logout() {
    // this.userService.logout(); // TODO
    this.router.navigate(['/'], { replaceUrl: true });
  }
}
