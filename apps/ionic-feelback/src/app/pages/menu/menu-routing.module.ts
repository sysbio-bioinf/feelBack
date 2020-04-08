import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'imprint',
        loadChildren: () =>
          import('./../imprint/imprint.module').then(
            (m) => m.ImprintPageModule,
          ),
      },
      {
        path: 'organizations',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('./../organization-list/organization-list.module').then(
                (m) => m.OrganizationListPageModule,
              ),
          },
          {
            path: ':id',
            loadChildren: () =>
              import(
                './../organization-detail/organization-detail.module'
              ).then((m) => m.OrganizationDetailPageModule),
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MenuPageRoutingModule {}
