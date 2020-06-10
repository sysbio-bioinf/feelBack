import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from '../../modules/shared.module';
import { OrganizationListPageRoutingModule } from './organization-list-routing.module';
import { OrganizationListPage } from './organization-list.page';

@NgModule({
  imports: [SharedModule, IonicModule, OrganizationListPageRoutingModule],
  declarations: [OrganizationListPage],
})
export class OrganizationListPageModule {}
