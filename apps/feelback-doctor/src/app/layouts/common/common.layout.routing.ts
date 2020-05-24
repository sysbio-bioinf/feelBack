import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonLayout } from './common.layout';

const routes: Routes = [
  {
    path: 'login',
    component: CommonLayout,
    loadChildren: () => import(`./pages/common.pages.module`).then(m => m.CommonPagesModule)
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommonLayoutRouting {}
