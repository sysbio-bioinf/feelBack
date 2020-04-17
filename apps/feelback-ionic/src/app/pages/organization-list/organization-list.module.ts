import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationListPageRoutingModule } from './organization-list-routing.module';

import { OrganizationListPage } from './organization-list.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationListPageRoutingModule
  ],
  declarations: [OrganizationListPage]
})
export class OrganizationListPageModule {}
