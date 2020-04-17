import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationDetailPage } from './organization-detail.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationDetailPageRoutingModule {}
