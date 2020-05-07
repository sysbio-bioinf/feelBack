import { HttpClient } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { createTranslateLoader } from '@cancerlog/shared/misc';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from './components.module';
import { UIModule } from './ui.module';

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
