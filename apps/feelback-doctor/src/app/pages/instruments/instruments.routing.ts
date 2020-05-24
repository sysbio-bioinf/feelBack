import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { InstrumentsPage } from './instruments.page';

const routes: Routes = [
  {
    path: 'patients/:patient',
    component: MainLayout,
    children: [
      {
        path: '',
        redirectTo: 'instruments',
        pathMatch: 'full',
      },
      {
        path: 'instruments',
        component: InstrumentsPage,
        data: {animation: 'Instruments'}
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class InstrumentsRouting {}
