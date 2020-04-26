import { NgModule } from '@angular/core';
import { LoginLayout } from './login/login.layout';
import { MainLayout } from './main/main.layout';
import { RouterModule } from '@angular/router';
import { ComponentsModule } from '../components/components.module';
import {MatDividerModule} from '@angular/material/divider';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    LoginLayout,
    MainLayout
  ],
  imports: [
    RouterModule,
    ComponentsModule,
    MatDividerModule,
    CommonModule
  ]
})
export class LayoutsModule { }
