import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { PatientPage } from './patient.page';

const routes: Routes = [
  {
    path: 'patients',
    component: MainLayout,
    children: [
      {
        path: ':patient',
        component: PatientPage,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientRoutingModule {}
