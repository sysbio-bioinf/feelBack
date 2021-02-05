import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { FaqListPageRoutingModule } from './faq-list-routing.module';
import { FaqListPage } from './faq-list.page';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
  imports: [SharedModule, IonicModule, FaqListPageRoutingModule, NgPipesModule],
  declarations: [FaqListPage],
})
export class FaqListPageModule {}
