import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationListPageRoutingModule } from './organization-list-routing.module';

import { OrganizationListPage } from './organization-list.page';
import { SharedModule } from 'src/app/features/shared/shared.module';

@NgModule({
  imports: [
    SharedModule,
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationListPageRoutingModule,
  ],
  declarations: [OrganizationListPage],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class OrganizationListPageModule {}
