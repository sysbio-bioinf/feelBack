import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppLayout } from './layouts/app/app.layout';
import { CommonLayout } from './layouts/common/common.layout';
import { ErrorPage } from './layouts/common/pages/error/error.page';

const routes: Routes = [
  { path: '', redirectTo: 'app', pathMatch: 'full' },
  {
    path: 'app',
    component: AppLayout,
    loadChildren: () =>
      import(`./layouts/app/app.layout.module`).then((m) => m.AppLayoutModule),
  },
  {
    path: '',
    component: CommonLayout,
    loadChildren: () =>
      import(`./layouts/common/common.layout.module`).then((m) => m.CommonLayoutModule),
  },
  {
    path: '**',
    component: CommonLayout,
    children: [{ path: '', component: ErrorPage }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRouting {}
