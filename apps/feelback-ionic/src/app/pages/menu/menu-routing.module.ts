import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MenuPage } from './menu.page';
import { AuthGuard } from 'src/app/guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: MenuPage,
    canActivate: [AuthGuard],
    children: [
      {
        path: 'home',
        loadChildren: () =>
          import('./../home/home.module').then((m) => m.HomePageModule),
      },
      {
        path: 'settings',
        loadChildren: () =>
          import('./../settings/settings.module').then(
            (m) => m.SettingsPageModule,
          ),
      },
      {
        path: 'imprint',
        loadChildren: () =>
          import('./../imprint/imprint.module').then(
            (m) => m.ImprintPageModule,
          ),
      },
      {
        path: 'my',
        children: [
          {
            path: 'profile',
            loadChildren: () =>
              import('./../profile/profile.module').then(
                (m) => m.ProfilePageModule,
              ),
          },
        ],
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
      {
        path: 'surveys',
        children: [
          {
            path: ':id',
            loadChildren: () =>
              import('./../survey/survey.module').then(
                (m) => m.SurveyPageModule,
              ),
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
