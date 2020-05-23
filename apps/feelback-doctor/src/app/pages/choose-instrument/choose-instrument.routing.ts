import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { ChooseInstrumentPage } from './choose-instrument.page';

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
        component: ChooseInstrumentPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ChooseInstrumentRouting {}
