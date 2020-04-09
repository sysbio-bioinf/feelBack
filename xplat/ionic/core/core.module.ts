import { NgModule, Optional, SkipSelf } from '@angular/core';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { throwIfAlreadyLoaded } from '@cancerlog/utils';
import { CancerlogCoreModule } from '@cancerlog/web';
import { File } from '@ionic-native/file/ngx';
import { StorageService } from './services';

@NgModule({
  imports: [CancerlogCoreModule, IonicModule.forRoot()],
  providers: [
    StatusBar,
    SplashScreen,
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    File,
    StorageService,
  ],
})
export class CancerlogIonicCoreModule {
  constructor(
    @Optional()
    @SkipSelf()
    parentModule: CancerlogIonicCoreModule,
  ) {
    throwIfAlreadyLoaded(parentModule, 'CancerlogIonicCoreModule');
  }
}
