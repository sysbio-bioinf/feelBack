import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { CommonModule } from '@angular/common';
import { LoginRouting } from './login.routing';
import { MaterialModule } from 'apps/feelback-doctor/src/app/material.module';

@NgModule({
  declarations: [LoginPage],
  imports: [MaterialModule, CommonModule, LoginRouting],
})
export class LoginModule {}
