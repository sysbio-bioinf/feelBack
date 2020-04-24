import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { FaqDetailPageRoutingModule } from './faq-detail-routing.module';
import { FaqDetailPage } from './faq-detail.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    FaqDetailPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [FaqDetailPage],
})
export class FaqDetailPageModule {}
