import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'patients',
    pathMatch: 'full',
  },
  {
    path: 'patients',
    component: PatientsPage,
    data: { animation: 'Patients' },
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRouting {}
