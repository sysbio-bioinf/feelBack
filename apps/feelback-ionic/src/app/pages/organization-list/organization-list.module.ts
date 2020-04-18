import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrganizationListPageRoutingModule } from './organization-list-routing.module';

import { OrganizationListPage } from './organization-list.page';
import { ComponentsModule } from 'src/app/modules/components.module';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationListPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild()
  ],
  declarations: [OrganizationListPage]
})
export class OrganizationListPageModule {}
