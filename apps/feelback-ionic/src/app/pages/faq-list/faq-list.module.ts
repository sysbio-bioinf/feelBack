import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/modules/shared.module';
import { FaqListPageRoutingModule } from './faq-list-routing.module';
import { FaqListPage } from './faq-list.page';

@NgModule({
  imports: [SharedModule, IonicModule, FaqListPageRoutingModule],
  declarations: [FaqListPage],
})
export class FaqListPageModule {}
