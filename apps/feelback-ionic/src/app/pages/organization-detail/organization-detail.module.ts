import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationDetailPageRoutingModule } from './organization-detail-routing.module';

import { OrganizationDetailPage } from './organization-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationDetailPageRoutingModule
  ],
  declarations: [OrganizationDetailPage]
})
export class OrganizationDetailPageModule {}
