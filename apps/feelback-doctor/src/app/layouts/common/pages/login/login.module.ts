import { NgModule } from '@angular/core';
import { LoginPage } from './login.page';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../../../../components/components.module';
import { MaterialModule } from '../../../../modules/material.module';
import { LoginRouting } from './login.routing';

@NgModule({
  declarations: [LoginPage],
  imports: [
    CommonModule,
    RouterModule,
    ComponentsModule,
    MaterialModule,
    LoginRouting,
  ],
})
export class LoginModule {}
