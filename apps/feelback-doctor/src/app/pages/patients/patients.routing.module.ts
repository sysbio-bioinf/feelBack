import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { PatientsPage } from './patients.page';

const routes: Routes = [
  {
    path: 'patients',
    component: MainLayout,
    children: [{ path: '', component: PatientsPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientsRoutingModule {}
