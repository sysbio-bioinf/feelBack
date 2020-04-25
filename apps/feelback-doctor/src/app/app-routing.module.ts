import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PatientDetailsPage } from './pages/patient-details/patient-details.page';
import { PatientListPage } from './pages/patient-list/patient-list.page';
import { LoginPage } from './pages/login/login.page';
import { LoginLayout } from './layouts/login/login.layout';
import { MainLayout } from './layouts/main/main.layout';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '',
    component: LoginLayout,
    children: [{ path: 'login', component: LoginPage }],
  },
  {
    path: '',
    component: MainLayout,
    children: [
      { path: 'patient-list', component: PatientListPage },
      { path: 'patient-details', component: PatientDetailsPage },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
