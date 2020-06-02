import { Component } from '@angular/core';
import { Platform } from '@ionic/angular';
import { Plugins, StatusBarStyle } from '@capacitor/core';
const { StatusBar } = Plugins;
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar as NgxStatusBar } from '@ionic-native/status-bar/ngx';
import { StorageService } from './services/storage.service';

@Component({
  selector: 'feelback-ionic-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: NgxStatusBar,
    private storageService: StorageService,
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

      this.storageService
        .createFeelbackDirectories()
        .then(() => console.log('feelback download directory created'))
        .catch((exception) => console.log(exception));
    });
  }
}
