import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRouting } from './pages/login/login.routing';
import { LoginLayout } from './layouts/login/login.layout';
import { ErrorPage } from './pages/error/error.page';
import { PatientsRouting } from './pages/patients/patients.routing';
import { InstrumentsRouting } from './pages/instruments/instruments.routing';
import { ScreeningsRouting } from './pages/screenings/screenings.routing';
import { ResultRouting } from './pages/result/result.routing';

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
    PatientsRouting,
    InstrumentsRouting,
    ScreeningsRouting,
    ResultRouting,
  ],
  exports: [RouterModule],
})
export class AppRouting {}
