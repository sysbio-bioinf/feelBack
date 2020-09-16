import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { MarkdownModule } from 'ngx-markdown';
import { SharedModule } from '../../modules/shared.module';
import { PrivacyPageRoutingModule } from './privacy-routing.module';
import { PrivacyPage } from './privacy.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    PrivacyPageRoutingModule,
    MarkdownModule.forChild(),
  ],
  declarations: [PrivacyPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class PrivacyPageModule {}
