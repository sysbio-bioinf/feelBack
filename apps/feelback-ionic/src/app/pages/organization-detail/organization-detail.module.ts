import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from 'src/app/modules/shared.module';
import { OrganizationDetailPageRoutingModule } from './organization-detail-routing.module';
import { OrganizationDetailPage } from './organization-detail.page';

@NgModule({
  imports: [
    SharedModule,
    IonicModule,
    OrganizationDetailPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrganizationDetailPage],
})
export class OrganizationDetailPageModule {}
