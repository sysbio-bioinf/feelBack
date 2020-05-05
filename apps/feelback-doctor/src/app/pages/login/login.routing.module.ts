import { Routes, RouterModule } from '@angular/router';
import { LoginLayout } from '../../layouts/login/login.layout';
import { LoginPage } from './login.page';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: 'login',
    component: LoginLayout,
    children: [{ path: '', component: LoginPage }],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginRoutingModule {}
