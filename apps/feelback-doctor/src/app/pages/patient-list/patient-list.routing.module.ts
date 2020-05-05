import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { MainLayout } from '../../layouts/main/main.layout';
import { PatientListPage } from './patient-list.page';

const routes: Routes = [
  {
    path: 'list',
    component: MainLayout,
    children: [{ path: '', component: PatientListPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PatientListRoutingModule {}
