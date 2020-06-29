import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Inject, NgModule } from '@angular/core';
import {
  createTranslateLoader,
  platformLanguageFactory,
  PlatformLanguageToken,
} from '@feelback-app/shared/misc';
import {
  TranslateLoader,
  TranslateModule,
  TranslateService,
} from '@ngx-translate/core';

@NgModule({
  imports: [
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
      useFactory: platformLanguageFactory,
    },
  ],
})
export class CoreModule {
  constructor(
    @Inject(PlatformLanguageToken) lang: string,
    translationService: TranslateService,
  ) {
    translationService.setDefaultLang(lang);
    translationService.use(lang);
  }
}
