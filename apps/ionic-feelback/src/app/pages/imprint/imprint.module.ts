import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { ImprintPageRoutingModule } from './imprint-routing.module';
import { ImprintComponent } from './imprint.page';
import { MarkdownModule } from 'ngx-markdown';

@NgModule({
  imports: [
    SharedModule,
    ImprintPageRoutingModule,
    TranslateModule.forChild(),
    MarkdownModule.forChild(),
  ],
  declarations: [ImprintComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImprintPageModule {}
