import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginRoutingModule } from './pages/login/login.routing.module';
import { PatientDetailsRoutingModule } from './pages/patient-details/patient-details.routing.module';
import { PatientListRoutingModule } from './pages/patient-list/patient-list.routing.module';
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
    PatientListRoutingModule,
    PatientDetailsRoutingModule,
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
