import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { TranslateModule } from '@ngx-translate/core';
import { ComponentsModule } from 'src/app/modules/components.module';
import { OrganizationDetailPageRoutingModule } from './organization-detail-routing.module';
import { OrganizationDetailPage } from './organization-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrganizationDetailPageRoutingModule,
    ComponentsModule,
    TranslateModule.forChild(),
  ],
  declarations: [OrganizationDetailPage],
})
export class OrganizationDetailPageModule {}
