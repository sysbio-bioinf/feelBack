import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { OrganizationDetailPageRoutingModule } from './organization-detail-routing.module';
import { OrganizationDetailPage } from './organization-detail.page';

@NgModule({
  imports: [SharedModule, IonicModule, OrganizationDetailPageRoutingModule],
  declarations: [OrganizationDetailPage],
})
export class OrganizationDetailPageModule {}
