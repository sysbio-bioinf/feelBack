import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { OrganizationListPage } from './organization-list.page';

const routes: Routes = [
  {
    path: '',
    component: OrganizationListPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class OrganizationListPageRoutingModule {}
