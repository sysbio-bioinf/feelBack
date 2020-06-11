import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { ImprintPage } from './imprint.page';

const routes: Routes = [
  {
    path: 'imprint',
    component: ImprintPage
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ImprintRouting {}
