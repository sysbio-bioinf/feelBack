import { NgModule } from '@angular/core';
import { LoginLayout } from './login/login.layout';
import { MainLayout } from './main/main.layout';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';

@NgModule({
  declarations: [
    LoginLayout,
    MainLayout
  ],
  imports: [
    RouterModule,
    ComponentsModule
  ]
})
export class LayoutsModule { }
