import { NgModule } from '@angular/core';
import { ComponentsModule } from './components.module';
import { UIModule } from './ui.module';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { createTranslateLoader } from '@cancerlog/shared/misc';
import { HttpClient } from '@angular/common/http';

@NgModule({
  imports: [
    UIModule,
    ComponentsModule,
    TranslateModule.forChild({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
      isolate: false,
    }),
  ],
  exports: [UIModule, ComponentsModule, TranslateModule],
})
export class SharedModule {}
