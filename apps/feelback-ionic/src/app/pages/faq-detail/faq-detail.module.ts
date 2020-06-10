import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { FaqDetailPageRoutingModule } from './faq-detail-routing.module';
import { FaqDetailPage } from './faq-detail.page';

@NgModule({
  imports: [SharedModule, IonicModule, FaqDetailPageRoutingModule],
  declarations: [FaqDetailPage],
})
export class FaqDetailPageModule {}
