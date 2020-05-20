import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutingModule } from './pages/login/login.routing.module';
import { PatientDetailsRoutingModule } from './pages/patient-details/patient-details.routing.module';
import { PatientsRoutingModule } from './pages/patients/patients.routing.module';
import { LoginLayout } from './layouts/login/login.layout';
import { ErrorPage } from './pages/error/error.page';
import { MainLayout } from './layouts/main/main.layout';
import { PatientPage } from './pages/patient/patient.page';
import { PatientRouting } from './pages/patient/patient.page.routing';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: MainLayout,
    children: [...PatientRouting],
  },
  {
    path: '**',
    component: LoginLayout,
    children: [{ path: '', component: ErrorPage }],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginRoutingModule,
    PatientsRoutingModule,
    PatientDetailsRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
