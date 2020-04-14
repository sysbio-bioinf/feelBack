import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginQrPage } from './login-qr.page';

const routes: Routes = [
  {
    path: '',
    component: LoginQrPage,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LoginQrPageRoutingModule {}
