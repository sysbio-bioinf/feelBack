import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsPage } from './pages/patient-details/patient-details.page';
import { PatientListPage } from './pages/patient-list/patient-list.page';
import { LoginPage } from './pages/login/login.page';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginPage },
  { path: 'patient-list', component: PatientListPage },
  { path: 'patient-details', component: PatientDetailsPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
