import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import {
  createTranslateLoader,
  platformLanguageFactory,
  PlatformLanguageToken,
} from '@cancerlog/shared/misc';
import { IonicRouteStrategy } from '@ionic/angular';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

@NgModule({
  imports: [
    BrowserModule,
    HttpClientModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
  ],
  providers: [
    {
      provide: RouteReuseStrategy,
      useClass: IonicRouteStrategy,
    },
    {
      provide: PlatformLanguageToken,
      useFactory: platformLanguageFactory,
    },
  ],
})
export class CoreModule {
  constructor(
    @Inject(PlatformLanguageToken) lang: string,
    translationService: TranslateService,
  ) {
    translationService.setDefaultLang('en');
    translationService.use(lang);
  }
}
