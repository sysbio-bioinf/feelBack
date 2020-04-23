import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { PlatformLanguageToken } from './../misc/tokens';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, '/assets/i18n', '.json');
}

export function platformLangFactory() {
  const browserLang = window.navigator.language || 'en'; // fallback English
  // browser language has 2 codes, ex: 'en-US'
  return browserLang.split('-')[0];
}

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
      provide: PlatformLanguageToken,
      useFactory: platformLangFactory,
    },
  ],
})
export class CoreModule {
  constructor(
    @Inject(PlatformLanguageToken) lang: string,
    translationService: TranslateService,
  ) {
    translationService.setDefaultLang('en');
    translationService.use('en');
  }
}
