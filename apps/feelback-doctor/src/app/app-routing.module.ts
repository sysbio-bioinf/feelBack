import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutingModule } from './pages/login/login.routing.module';
import { PatientDetailsRoutingModule } from './pages/patient-details/patient-details.routing.module';
import { PatientsRoutingModule } from './pages/patients/patients.routing.module';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { LoginLayout } from './layouts/login/login.layout';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    component: LoginLayout,
    children: [{ path: '', component: PageNotFoundComponent }],
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
