import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../../modules/shared.module';
import { ImprintPageRoutingModule } from './imprint-routing.module';
import { ImprintPage } from './imprint.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    ImprintPageRoutingModule,
    MarkdownModule.forChild(),
  ],
  declarations: [ImprintPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class ImprintPageModule {}
