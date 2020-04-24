import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientListPage } from './pages/patient-list/patient-list.page';
import { PatientDetailsPage } from './pages/patient-details/patient-details.page';

const routes: Routes = [
  { path: '', redirectTo: 'patient-list', pathMatch: 'full'},
  { path: 'patient-list', component: PatientListPage },
  { path: 'patient-details', component: PatientDetailsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
