import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRouting } from './pages/login/login.routing';
import { LoginLayout } from './layouts/login/login.layout';
import { ErrorPage } from './pages/error/error.page';
import { InstrumentRouting } from './pages/instrument/instrument.routing';
import { PatientRouting } from './pages/patient/patient.routing';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: '**',
    component: LoginLayout,
    children: [{ path: '', component: ErrorPage }],
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    LoginRouting,
    PatientRouting,
    InstrumentRouting,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
