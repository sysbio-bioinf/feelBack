import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { AppLayout } from '../../layouts/app/app.layout';

const routes: Routes = [
  {
    path: 'app',
    component: AppLayout,
    loadChildren: () => import(`./pages/app.pages.module`).then(m => m.AppPagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AppLayoutRouting {}
