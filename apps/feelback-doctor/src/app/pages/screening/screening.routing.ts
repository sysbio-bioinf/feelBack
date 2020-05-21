import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { ScreeningPage } from './screening.page';

const routes: Routes = [
  {
    path: 'patients/:patient/instruments/:instrument/screenings',
    component: MainLayout,
    children: [
      {
        path: ':screening',
        component: ScreeningPage
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ScreeningRouting {}
