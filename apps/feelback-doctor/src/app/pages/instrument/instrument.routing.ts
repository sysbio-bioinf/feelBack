import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { InstrumentPage } from './instrument.page';

const routes: Routes = [
  {
    path: 'patients/:patient/instruments/:instrument',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'screenings',
        pathMatch: 'full',
      },
      {
        path: 'screenings',
        component: InstrumentPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentRouting {}
