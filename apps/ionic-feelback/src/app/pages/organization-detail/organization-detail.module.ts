import { CommonModule } from '@angular/common';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { SharedModule } from 'src/app/features/shared/shared.module';
import { OrganizationDetailPageRoutingModule } from './organization-detail-routing.module';
import { OrganizationDetailPage } from './organization-detail.page';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationDetailPageRoutingModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrganizationDetailPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrganizationDetailPageModule {}
