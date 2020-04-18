import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from 'src/app/modules/shared.module';
import { ImprintPageRoutingModule } from './imprint-routing.module';
import { ImprintPage } from './imprint.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    ImprintPageRoutingModule,
    TranslateModule.forChild(),
    MarkdownModule.forChild(),
  ],
  declarations: [ImprintPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImprintPageModule {}
